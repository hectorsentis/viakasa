import { fallbackProperties, fallbackServices, fallbackSettings } from '@/src/data/fallback'
import { mediaUrl } from '@/src/lib/format'
import { getPayloadClient } from '@/src/lib/payload'

export type PublicProperty = (typeof fallbackProperties)[number]
export type PublicSettings = typeof fallbackSettings

export async function getSiteSettings(): Promise<PublicSettings> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({ collection: 'site-settings', limit: 1 })
    const doc = result.docs[0] as Partial<PublicSettings> | undefined
    return { ...fallbackSettings, ...doc }
  } catch {
    return fallbackSettings
  }
}

export async function getServices() {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({ collection: 'services', sort: 'order', limit: 20 })
    return result.docs.length ? result.docs : fallbackServices
  } catch {
    return fallbackServices
  }
}

export async function getProperties({ featuredOnly = false } = {}): Promise<PublicProperty[]> {
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
    return result.docs.map((doc: any) => ({
      ...doc,
      id: doc.id,
      mainImageUrl: mediaUrl(doc.mainImage, fallbackProperties[0].mainImageUrl),
      galleryUrls: Array.isArray(doc.gallery)
        ? doc.gallery.map((item: any) => mediaUrl(item.image)).filter(Boolean)
        : []
    }))
  } catch {
    return fallbackProperties
  }
}

export async function getProperty(slug: string): Promise<PublicProperty | null> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'properties',
      depth: 2,
      limit: 1,
      where: { slug: { equals: slug } }
    })
    if (!result.docs.length) return null
    const doc = result.docs[0] as any
    return {
      ...doc,
      id: doc.id,
      mainImageUrl: mediaUrl(doc.mainImage, fallbackProperties[0].mainImageUrl),
      galleryUrls: Array.isArray(doc.gallery)
        ? doc.gallery.map((item: any) => mediaUrl(item.image)).filter(Boolean)
        : []
    }
  } catch {
    return fallbackProperties.find((p) => p.slug === slug) || null
  }
}
