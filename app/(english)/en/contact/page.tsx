import type { Metadata } from 'next'
import { Mail, MapPin, Phone } from 'lucide-react'
import { getSiteSettings } from '@/src/lib/content'
import { ContactForm } from '@/src/ui/ContactForm'

export const metadata: Metadata = { title: 'Contact', description: 'Contact Viakasa to buy, sell, value or manage a property in Madrid, Tenerife or elsewhere in Spain.', alternates: { canonical: '/en/contact', languages: { 'es-ES': '/contacto', 'en-GB': '/en/contact' } } }
export default async function ContactPage() { const settings = await getSiteSettings('en'); return <section className="section" style={{ background: 'var(--navy-900)' }}><div className="container contact-grid"><div><span className="eyebrow">Contact</span><h1 className="section-title" style={{ color: '#fff' }}>Tell us what you need</h1><p className="section-intro" style={{ color: 'var(--navy-200)' }}>We will reply with a clear proposal and the most useful next step for your situation.</p><ul className="footer-list" style={{ color: 'var(--navy-200)', marginTop: 30 }}><li><Phone size={17} color="var(--gold-400)" /> {settings.phone}</li><li><Mail size={17} color="var(--gold-400)" /> {settings.email}</li><li><MapPin size={17} color="var(--gold-400)" /> {settings.offices}</li></ul></div><ContactForm locale="en" /></div></section> }
