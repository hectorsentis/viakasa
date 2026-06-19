import type { MetadataRoute } from 'next'

import { getProperties } from '@/src/lib/content'
import { absoluteUrl } from '@/src/lib/seo'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'), lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: absoluteUrl('/propiedades'), lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: absoluteUrl('/servicios'), lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: absoluteUrl('/nosotros'), lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: absoluteUrl('/contacto'), lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: absoluteUrl('/aviso-legal'), lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: absoluteUrl('/privacidad'), lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: absoluteUrl('/cookies'), lastModified: now, changeFrequency: 'yearly', priority: 0.2 }
  ]

  const properties = await getProperties()
  const propertyRoutes: MetadataRoute.Sitemap = properties.map((property) => ({
    url: absoluteUrl(`/propiedades/${property.slug}`),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: property.featured ? 0.85 : 0.75
  }))

  return [...staticRoutes, ...propertyRoutes]
}
