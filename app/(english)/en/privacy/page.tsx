import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Privacy', alternates: { canonical: '/en/privacy', languages: { 'es-ES': '/privacidad', 'en-GB': '/en/privacy' } } }
export default function Page() { return <article className="legal-card"><h1>Privacy policy</h1><p>We process the information you provide solely to handle your property request and answer your enquiries. You may request access, correction or deletion by contacting Viakasa.</p></article> }
