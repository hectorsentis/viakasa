import type { Metadata } from 'next'

import { getProperties } from '@/src/lib/content'
import { breadcrumbJsonLd, jsonLdScript, pageMetadata } from '@/src/lib/seo'
import { PropertyCard } from '@/src/ui/PropertyCard'

export const metadata: Metadata = pageMetadata({
  title: 'Propiedades en Madrid, Tenerife y toda España',
  description:
    'Consulta viviendas seleccionadas por Viakasa: pisos, áticos, villas y oportunidades inmobiliarias con asesoramiento legal y financiero.',
  path: '/propiedades'
})

export default async function PropertiesPage() {
  const properties = await getProperties()
  const cities = ['Todas', ...Array.from(new Set(properties.map((property) => property.city).filter(Boolean)))]

  return (
    <section className="section section-alt">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([
            { name: 'Inicio', path: '/' },
            { name: 'Propiedades', path: '/propiedades' }
          ])
        )}
      />
      <div className="container">
        <span className="eyebrow">Propiedades</span>
        <h1 className="section-title">Viviendas seleccionadas con criterio</h1>
        <p className="section-intro">
          Trabajamos con una cartera cuidada para que cada visita tenga sentido. Si no encuentras lo que buscas, cuéntanoslo y te ayudamos.
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 28 }}>
          {cities.map((city) => <span className="button button-outline" key={city}>{city}</span>)}
        </div>
        <div className="grid-3">
          {properties.map((property) => <PropertyCard key={property.id} property={property} />)}
        </div>
      </div>
    </section>
  )
}
