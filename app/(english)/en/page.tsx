import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'

import { getProperties, getServices, getSiteSettings } from '@/src/lib/content'
import { ContactForm } from '@/src/ui/ContactForm'
import { PropertyCard } from '@/src/ui/PropertyCard'
import { ServiceCard } from '@/src/ui/ServiceCard'

export default async function EnglishHomePage() {
  const [settings, services, properties] = await Promise.all([
    getSiteSettings('en'), getServices('en'), getProperties({ featuredOnly: true, locale: 'en' })
  ])
  return <>
    <section className="hero">
      <Image className="hero-image" src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&q=82" alt="" width={1800} height={1100} priority />
      <div className="container hero-content">
        <span className="eyebrow">Madrid · Tenerife · Across Spain</span>
        <h1>{settings.heroTitle}</h1><p>{settings.heroText}</p>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <Link className="button button-accent" href="/en/properties">{settings.primaryCta} <ArrowRight size={17} /></Link>
          <Link className="button button-outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.5)' }} href="/en/contact">{settings.secondaryCta}</Link>
        </div>
      </div>
    </section>
    <section className="trust-strip"><div className="container trust-grid">
      <div><strong>+15</strong><span>Years of experience</span></div><div><strong>+850</strong><span>Completed transactions</span></div>
      <div><strong>98%</strong><span>Satisfied clients</span></div><div><strong>2</strong><span>Offices · Madrid and Tenerife</span></div>
    </div></section>
    <section className="section"><div className="container"><span className="eyebrow">Our services</span><h2 className="section-title">Complete guidance, from start to finish</h2><p className="section-intro">One trusted point of contact for every decision about your property.</p><div className="grid-4">{services.map((service: any) => <ServiceCard key={service.id || service.title} service={service} />)}</div></div></section>
    <section className="section section-alt"><div className="container"><span className="eyebrow">Featured properties</span><h2 className="section-title">A selection worth your attention</h2><div className="grid-3">{properties.map((property) => <PropertyCard key={property.id} property={property} locale="en" />)}</div></div></section>
    <section className="section"><div className="container about-grid">
      <Image className="about-image" src="/assets/about-interior.png" alt="Sunlit contemporary Spanish home interior" width={900} height={600} />
      <div><span className="eyebrow">About us</span><h2 className="section-title">Trust, personal service and rigour in every transaction</h2><p className="section-intro">Buying or selling a home is one of life’s most important decisions. We guide you with transparency, sound judgement and genuine market knowledge.</p><ul className="footer-list" style={{ marginTop: 26, color: 'var(--ink)' }}>{['Legal and financial advice under one roof','Local expertise in Madrid and Tenerife','Clear communication at every stage'].map((item) => <li key={item}><Check size={17} color="var(--gold-600)" /> {item}</li>)}</ul></div>
    </div></section>
    <section className="section" style={{ background: 'var(--navy-900)' }}><div className="container contact-grid"><div><span className="eyebrow">Let’s talk</span><h2 className="section-title" style={{ color: '#fff' }}>Tell us what you need</h2><p className="section-intro" style={{ color: 'var(--navy-200)' }}>We will assess your situation and give you a clear, no-obligation next step.</p></div><ContactForm locale="en" /></div></section>
  </>
}
