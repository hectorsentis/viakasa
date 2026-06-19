import { getProperties, getServices, getSiteSettings } from '@/src/lib/content'
import { absoluteUrl, defaultSeo } from '@/src/lib/seo'

export async function GET() {
  const [settings, services, properties] = await Promise.all([getSiteSettings(), getServices(), getProperties()])
  const body = [
    '# Viakasa',
    '',
    '> Asesoría inmobiliaria integral en Madrid, Tenerife y toda España.',
    '',
    `Sitio oficial: ${absoluteUrl('/')}`,
    `Contacto: ${settings.phone} · ${settings.email}`,
    `Sedes: ${settings.offices}`,
    '',
    '## Qué ofrece Viakasa',
    defaultSeo.description,
    '',
    '## Servicios',
    ...services.map((service: any) => `- ${service.title}: ${service.description}`),
    '',
    '## Páginas principales',
    `- Inicio: ${absoluteUrl('/')}`,
    `- Propiedades: ${absoluteUrl('/propiedades')}`,
    `- Servicios: ${absoluteUrl('/servicios')}`,
    `- Nosotros: ${absoluteUrl('/nosotros')}`,
    `- Contacto: ${absoluteUrl('/contacto')}`,
    '',
    '## Propiedades publicadas',
    ...properties.map((property) => `- ${property.title}, ${property.location}: ${absoluteUrl(`/propiedades/${property.slug}`)}`)
  ].join('\n')

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400'
    }
  })
}
