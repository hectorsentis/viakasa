import type { Metadata } from 'next'

import { getServices } from '@/src/lib/content'
import { breadcrumbJsonLd, jsonLdScript, pageMetadata } from '@/src/lib/seo'
import { ServiceCard } from '@/src/ui/ServiceCard'

export const metadata: Metadata = pageMetadata({
  title: 'Servicios inmobiliarios integrales',
  description:
    'Compra, venta, valoración, asesoría legal, financiación y gestión inmobiliaria con Viakasa en Madrid, Tenerife y toda España.',
  path: '/servicios'
})

export default async function ServicesPage() {
  const services = await getServices()
  return (
    <section className="section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([
            { name: 'Inicio', path: '/' },
            { name: 'Servicios', path: '/servicios' }
          ])
        )}
      />
      <div className="container">
        <span className="eyebrow">Servicios</span>
        <h1 className="section-title">Acompañamiento inmobiliario completo</h1>
        <p className="section-intro">
          Integramos valoración, comercialización, negociación, financiación y soporte jurídico para que cada paso avance con claridad.
        </p>
        <div className="grid-4">
          {services.map((service: any) => <ServiceCard key={service.id || service.title} service={service} />)}
        </div>
      </div>
    </section>
  )
}
