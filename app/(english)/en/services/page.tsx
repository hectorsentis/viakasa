import type { Metadata } from 'next'
import { getServices } from '@/src/lib/content'
import { ServiceCard } from '@/src/ui/ServiceCard'

export const metadata: Metadata = { title: 'Complete property services', description: 'Buying, selling, valuations, legal advice, finance and property management with Viakasa.', alternates: { canonical: '/en/services', languages: { 'es-ES': '/servicios', 'en-GB': '/en/services' } } }
export default async function ServicesPage() { const services = await getServices('en'); return <section className="section"><div className="container"><span className="eyebrow">Services</span><h1 className="section-title">Complete property guidance</h1><p className="section-intro">We bring together valuation, marketing, negotiation, finance and legal support so every step moves forward clearly.</p><div className="grid-4">{services.map((service: any) => <ServiceCard key={service.id || service.title} service={service} />)}</div></div></section> }
