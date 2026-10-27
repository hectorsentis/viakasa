import { fallbackProperties, fallbackServices, fallbackSettings } from '@/src/data/fallback'
import { mediaUrl } from '@/src/lib/format'
import { getPayloadClient } from '@/src/lib/payload'
import { localized, type Locale } from '@/src/i18n'

export type PropertyImage = { url: string; alt: string }
export type PublicProperty = (typeof fallbackProperties)[number] & {
  mainImageAlt?: string
  galleryImages?: PropertyImage[]
}
export type PublicSettings = typeof fallbackSettings

function localizeProperty(doc: any, locale: Locale) {
  const result = localized(doc, locale) as any
  if (locale === 'en' && Array.isArray(result.features)) {
    result.features = result.features.map((feature: any) => localized(feature, locale))
  }
  return result
}

function mediaAlt(media: any, locale: Locale, fallback: string) {
  if (!media || typeof media !== 'object') return fallback
  return locale === 'en' ? media.altEn || media.alt || fallback : media.alt || fallback
}

export async function getSiteSettings(locale: Locale = 'es'): Promise<PublicSettings> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({ collection: 'site-settings', limit: 1 })
    const doc = result.docs[0] as Partial<PublicSettings> | undefined
    return localized({ ...fallbackSettings, ...doc } as Record<string, unknown>, locale) as PublicSettings
  } catch {
    return localized(fallbackSettings as unknown as Record<string, unknown>, locale) as PublicSettings
  }
}

export async function getServices(locale: Locale = 'es') {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({ collection: 'services', sort: 'order', limit: 20 })
    const docs = result.docs.length ? result.docs : fallbackServices
    return docs.map((doc) => localized(doc as Record<string, unknown>, locale))
  } catch {
    return fallbackServices.map((doc) => localized(doc as unknown as Record<string, unknown>, locale))
  }
}

export async function getProperties({ featuredOnly = false, locale = 'es' as Locale } = {}): Promise<PublicProperty[]> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'properties',
      depth: 2,
      limit: featuredOnly ? 6 : 100,
      sort: '-featured,title',
      where: featuredOnly ? { featured: { equals: true } } : undefined
    })
    if (!result.docs.length) return fallbackProperties
    return result.docs.map((raw: any) => {
      const doc = localizeProperty(raw, locale)
      return ({
      ...doc,
      id: doc.id,
      mainImageUrl: mediaUrl(doc.mainImage, doc.externalImageUrl || fallbackProperties[0].mainImageUrl),
      mainImageAlt: mediaAlt(doc.mainImage, locale, doc.title),
      galleryImages: Array.isArray(doc.gallery)
        ? doc.gallery.map((item: any) => ({ url: mediaUrl(item.image), alt: mediaAlt(item.image, locale, doc.title) })).filter((image: PropertyImage) => image.url)
        : [],
      galleryUrls: Array.isArray(doc.gallery)
        ? doc.gallery.map((item: any) => mediaUrl(item.image)).filter(Boolean)
        : []
      })
    })
  } catch {
    return fallbackProperties.map((doc) => localizeProperty(doc, locale))
  }
}

export async function getProperty(slug: string, locale: Locale = 'es'): Promise<PublicProperty | null> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'properties',
      depth: 2,
      limit: 1,
      where: { slug: { equals: slug } }
    })
    if (!result.docs.length) return null
    const doc = localizeProperty(result.docs[0], locale)
    return {
      ...doc,
      id: doc.id,
      mainImageUrl: mediaUrl(doc.mainImage, doc.externalImageUrl || fallbackProperties[0].mainImageUrl),
      mainImageAlt: mediaAlt(doc.mainImage, locale, doc.title),
      galleryImages: Array.isArray(doc.gallery)
        ? doc.gallery.map((item: any) => ({ url: mediaUrl(item.image), alt: mediaAlt(item.image, locale, doc.title) })).filter((image: PropertyImage) => image.url)
        : [],
      galleryUrls: Array.isArray(doc.gallery)
        ? doc.gallery.map((item: any) => mediaUrl(item.image)).filter(Boolean)
        : []
    }
  } catch {
    const fallback = fallbackProperties.find((p) => p.slug === slug)
    return fallback ? localizeProperty(fallback, locale) : null
  }
}
