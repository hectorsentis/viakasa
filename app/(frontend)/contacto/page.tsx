import type { Metadata } from 'next'
import { Mail, MapPin, Phone } from 'lucide-react'

import { getSiteSettings } from '@/src/lib/content'
import { breadcrumbJsonLd, jsonLdScript, pageMetadata } from '@/src/lib/seo'
import { ContactForm } from '@/src/ui/ContactForm'

export const metadata: Metadata = pageMetadata({
  title: 'Contacto',
  description:
    'Contacta con Viakasa para comprar, vender, valorar o gestionar una vivienda en Madrid, Tenerife o cualquier punto de España.',
  path: '/contacto'
})

export default async function ContactPage() {
  const settings = await getSiteSettings()
  return (
    <section className="section" style={{ background: 'var(--navy-900)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([
            { name: 'Inicio', path: '/' },
            { name: 'Contacto', path: '/contacto' }
          ])
        )}
      />
      <div className="container contact-grid">
        <div>
          <span className="eyebrow">Contacto</span>
          <h1 className="section-title" style={{ color: '#fff' }}>Cuéntanos qué necesitas</h1>
          <p className="section-intro" style={{ color: 'var(--navy-200)' }}>
            Te responderemos con una propuesta clara y el siguiente paso más conveniente para tu caso.
          </p>
          <ul className="footer-list" style={{ color: 'var(--navy-200)', marginTop: 30 }}>
            <li><Phone size={17} color="var(--gold-400)" /> {settings.phone}</li>
            <li><Mail size={17} color="var(--gold-400)" /> {settings.email}</li>
            <li><MapPin size={17} color="var(--gold-400)" /> {settings.offices}</li>
          </ul>
        </div>
        <ContactForm />
      </div>
    </section>
  )
}
