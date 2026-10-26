import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Cookies', alternates: { canonical: '/en/cookies', languages: { 'es-ES': '/cookies', 'en-GB': '/en/cookies' } } }
export default function Page() { return <article className="legal-card"><h1>Cookie policy</h1><p>We use technical cookies that are necessary for the website to operate. Any analytics or advertising tools will be configured with the appropriate consent.</p></article> }
