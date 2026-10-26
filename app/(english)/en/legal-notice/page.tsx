import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Legal notice', alternates: { canonical: '/en/legal-notice', languages: { 'es-ES': '/aviso-legal', 'en-GB': '/en/legal-notice' } } }
export default function Page() { return <article className="legal-card"><h1>Legal notice</h1><p>This website belongs to Viakasa Property Advisers. The information published is for guidance only and may be updated without prior notice.</p></article> }
