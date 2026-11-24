import { fallbackServices, fallbackSettings } from '@/src/data/fallback'
import { mediaUrl } from '@/src/lib/format'
import { getPayloadClient } from '@/src/lib/payload'
import { localized, type Locale } from '@/src/i18n'

export type PropertyImage = { url: string; alt: string }
export type PublicSettings = typeof fallbackSettings

export type PublicProperty = {
  id: string | number
  slug: string
  reference?: string | null
  title: string
  description: string
  location: string
  city?: string | null
  price?: number | null
  pricePerSqm?: number | null
  priceNote?: string | null
  operation?: 'sale' | 'rent' | null
  commercialStatus?: 'available' | 'reserved' | 'sold' | 'rented' | null
  propertyType?: string | null
  rooms?: number | null
  bathrooms?: number | null
  area?: number | null
  usableArea?: number | null
  year?: number | null
  features?: Array<{ label: string }>
  energy?: {
    status?: 'available' | 'pending' | 'exempt' | null
    consumptionRating?: string | null
    consumption?: number | null
    emissionsRating?: string | null
    emissions?: number | null
  } | null
  address?: string | null
  postalCode?: string | null
  latitude?: number | null
  longitude?: number | null
  showExactLocation?: boolean | null
  featured?: boolean | null
  status?: string | null
  seo?: { title?: string | null; description?: string | null; noIndex?: boolean | null } | null
  updatedAt?: string
  mainImageUrl: string
  mainImageAlt?: string
  galleryImages: PropertyImage[]
  galleryUrls: string[]
}

/** Imagen neutra de marca para fichas sin fotografía (nunca una foto de stock). */
export const PROPERTY_PLACEHOLDER_IMAGE = '/brand/viakasa-icon-dark.png'

/**
 * Condición pública: única fuente de verdad de qué propiedades son visibles.
 * Se combina con `overrideAccess: false` para que la Local API aplique las mismas
 * reglas de acceso (colección y campos) que la API REST/GraphQL pública.
 */
const publishedOnly = { status: { equals: 'published' } } as const

function localizeProperty(doc: any, locale: Locale) {
  const result = localized(doc, locale) as any
  if (locale === 'en' && Array.isArray(result.features)) {
    result.features = result.features.map((feature: any) => localized(feature, locale))
  }
  if (locale === 'en' && result.seo) result.seo = localized(result.seo, locale)
  return result
}

function mediaAlt(media: any, locale: Locale, fallback: string) {
  if (!media || typeof media !== 'object') return fallback
  return locale === 'en' ? media.altEn || media.alt || fallback : media.alt || fallback
}

/** Normaliza un documento de Payload al formato público (también lo usa la vista previa). */
export function toPublicProperty(raw: any, locale: Locale): PublicProperty {
  const doc = localizeProperty(raw, locale)
  const galleryImages: PropertyImage[] = Array.isArray(doc.gallery)
    ? doc.gallery
        .map((item: any) => ({ url: mediaUrl(item?.image), alt: mediaAlt(item?.image, locale, doc.title) }))
        .filter((image: PropertyImage) => image.url)
    : []
  const mainImageUrl = mediaUrl(doc.mainImage) || galleryImages[0]?.url || doc.externalImageUrl || PROPERTY_PLACEHOLDER_IMAGE
  return {
    ...doc,
    id: doc.id,
    features: Array.isArray(doc.features) ? doc.features.filter((feature: any) => feature?.label) : [],
    mainImageUrl,
    mainImageAlt: mediaAlt(doc.mainImage, locale, doc.title),
    galleryImages,
    galleryUrls: galleryImages.map((image) => image.url)
  }
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

// Las propiedades sólo proceden de la base de datos. Si la consulta falla se
// devuelve una lista vacía: nunca se muestran inmuebles de ejemplo.
export async function getProperties({ featuredOnly = false, locale = 'es' as Locale } = {}): Promise<PublicProperty[]> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'properties',
      depth: 2,
      limit: featuredOnly ? 6 : 200,
      overrideAccess: false,
      sort: featuredOnly ? ['featuredOrder', '-publishedAt'] : ['-featured', 'featuredOrder', '-publishedAt'],
      where: featuredOnly ? { and: [publishedOnly, { featured: { equals: true } }] } : publishedOnly
    })
    return result.docs.map((raw) => toPublicProperty(raw, locale))
  } catch (error) {
    console.error('No se pudieron cargar las propiedades', error)
    return []
  }
}

export async function getProperty(slug: string, locale: Locale = 'es'): Promise<PublicProperty | null> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'properties',
      depth: 2,
      limit: 1,
      overrideAccess: false,
      where: { and: [publishedOnly, { slug: { equals: slug } }] }
    })
    return result.docs[0] ? toPublicProperty(result.docs[0], locale) : null
  } catch (error) {
    console.error(`No se pudo cargar la propiedad ${slug}`, error)
    return null
  }
}
