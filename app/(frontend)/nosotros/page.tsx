import type { Metadata } from 'next'
import Image from 'next/image'
import { Check } from 'lucide-react'

export const metadata: Metadata = { title: 'Nosotros' }

export default function AboutPage() {
  return (
    <section className="section">
      <div className="container about-grid">
        <Image
          className="about-image"
          src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1100&q=82"
          alt="Equipo Viakasa en una reunión de asesoramiento"
          width={900}
          height={620}
        />
        <div>
          <span className="eyebrow">Nosotros</span>
          <h1 className="section-title">Una asesoría cercana con rigor profesional</h1>
          <p className="section-intro">
            Viakasa nace para ofrecer una vía directa, clara y segura en decisiones inmobiliarias importantes. Trabajamos desde Madrid y Tenerife con vocación nacional.
          </p>
          <ul className="footer-list" style={{ marginTop: 28, color: 'var(--ink)' }}>
            {['Acompañamiento personal de inicio a fin', 'Criterio legal y financiero integrado', 'Comunicación clara, sin presión comercial'].map((item) => (
              <li key={item}><Check size={17} color="var(--gold-600)" /> {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
