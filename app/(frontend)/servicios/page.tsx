import type { Metadata } from 'next'

import { getServices } from '@/src/lib/content'
import { ServiceCard } from '@/src/ui/ServiceCard'

export const metadata: Metadata = { title: 'Servicios' }

export default async function ServicesPage() {
  const services = await getServices()
  return (
    <section className="section">
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
