import { getProperties, getServices, getSiteSettings } from '@/src/lib/content'
import { absoluteUrl, defaultSeo } from '@/src/lib/seo'

export async function GET() {
  const [settings, services, properties] = await Promise.all([getSiteSettings(), getServices(), getProperties()])
  const body = [
    '# Viakasa · información para buscadores e inteligencias artificiales',
    '',
    '## Identidad',
    `Nombre: ${settings.siteName}`,
    `Lema: ${settings.tagline}`,
    `Descripción: ${defaultSeo.description}`,
    `URL canónica: ${absoluteUrl('/')}`,
    `Teléfono: ${settings.phone}`,
    `Email: ${settings.email}`,
    `Sedes: ${settings.offices}`,
    '',
    '## Servicios',
    ...services.map((service: any) => `### ${service.title}\n${service.description}`),
    '',
    '## Propiedades',
    ...properties.map((property) =>
      [
        `### ${property.title}`,
        `URL: ${absoluteUrl(`/propiedades/${property.slug}`)}`,
        `Ubicación: ${property.location}`,
        `Tipo: ${property.propertyType}`,
        `Habitaciones: ${property.rooms || 'No indicado'}`,
        `Baños: ${property.bathrooms || 'No indicado'}`,
        `Superficie: ${property.area ? `${property.area} m²` : 'No indicada'}`,
        `Descripción: ${property.description}`
      ].join('\n')
    )
  ].join('\n\n')

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400'
    }
  })
}
