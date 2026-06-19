import Image from 'next/image'
import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'

import { getProperties, getServices, getSiteSettings } from '@/src/lib/content'
import { ContactForm } from '@/src/ui/ContactForm'
import { PropertyCard } from '@/src/ui/PropertyCard'
import { ServiceCard } from '@/src/ui/ServiceCard'

export default async function HomePage() {
  const [settings, services, properties] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getProperties({ featuredOnly: true })
  ])

  return (
    <>
      <section className="hero">
        <Image
          className="hero-image"
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&q=82"
          alt=""
          width={1800}
          height={1100}
          priority
        />
        <div className="container hero-content">
          <span className="eyebrow">Madrid · Tenerife · Toda España</span>
          <h1>{settings.heroTitle}</h1>
          <p>{settings.heroText}</p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link className="button button-accent" href="/propiedades">
              {settings.primaryCta} <ArrowRight size={17} />
            </Link>
            <Link className="button button-outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.5)' }} href="/contacto">
              {settings.secondaryCta}
            </Link>
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="container trust-grid">
          <div><strong>+15</strong><span>Años de experiencia</span></div>
          <div><strong>+850</strong><span>Operaciones cerradas</span></div>
          <div><strong>98%</strong><span>Clientes satisfechos</span></div>
          <div><strong>2</strong><span>Sedes · Madrid y Tenerife</span></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="eyebrow">Nuestros servicios</span>
          <h2 className="section-title">Acompañamiento integral, de principio a fin</h2>
          <p className="section-intro">Un único interlocutor de confianza para cada decisión sobre tu vivienda.</p>
          <div className="grid-4">
            {services.map((service: any) => <ServiceCard key={service.id || service.title} service={service} />)}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <span className="eyebrow">Propiedades destacadas</span>
          <h2 className="section-title">Una selección que merece tu atención</h2>
          <div className="grid-3">
            {properties.map((property) => <PropertyCard key={property.id} property={property} />)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container about-grid">
          <Image
            className="about-image"
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1100&q=82"
            alt="Equipo de asesoría inmobiliaria"
            width={900}
            height={620}
          />
          <div>
            <span className="eyebrow">Quiénes somos</span>
            <h2 className="section-title">Confianza, cercanía y rigor en cada operación</h2>
            <p className="section-intro">
              En Viakasa entendemos que comprar o vender una vivienda es una de las decisiones más importantes de tu vida.
              Te acompañamos con transparencia, criterio y conocimiento real del mercado.
            </p>
            <ul className="footer-list" style={{ marginTop: 26, color: 'var(--ink)' }}>
              {['Asesoramiento personalizado, sin prisas', 'Equipo legal y financiero propio', 'Conocimiento profundo de Madrid y Canarias'].map((item) => (
                <li key={item}><Check size={17} color="var(--gold-600)" /> {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--navy-900)' }}>
        <div className="container contact-grid">
          <div>
            <span className="eyebrow">Hablemos</span>
            <h2 className="section-title" style={{ color: '#fff' }}>Solicita tu valoración gratuita</h2>
            <p className="section-intro" style={{ color: 'var(--navy-200)' }}>
              Cuéntanos qué necesitas y un asesor te contactará en menos de 24 horas. Sin compromiso.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  )
}
