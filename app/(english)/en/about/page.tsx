import type { Metadata } from 'next'
import Image from 'next/image'
import { Check } from 'lucide-react'

export const metadata: Metadata = { title: 'About us', description: 'Meet Viakasa, trusted property advisers serving Madrid, Tenerife and clients across Spain.', alternates: { canonical: '/en/about', languages: { 'es-ES': '/nosotros', 'en-GB': '/en/about' } } }

export default function AboutPage() {
  return <section className="section"><div className="container about-grid">
    <Image className="about-image" src="/assets/about-interior.png" alt="Sunlit contemporary Spanish home interior" width={900} height={600} priority />
    <div><span className="eyebrow">About us</span><h1 className="section-title">Personal advice backed by professional rigour</h1><p className="section-intro">Viakasa was created to provide a direct, clear and secure route through important property decisions. From Madrid and Tenerife, we support clients throughout Spain.</p><ul className="footer-list" style={{ marginTop: 28, color: 'var(--ink)' }}>{['Personal guidance from start to finish','Integrated legal and financial expertise','Clear communication without sales pressure'].map((item) => <li key={item}><Check size={17} color="var(--gold-600)" /> {item}</li>)}</ul></div>
  </div></section>
}
