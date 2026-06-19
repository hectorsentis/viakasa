import type { Metadata } from 'next'

import { pageMetadata } from '@/src/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Política de cookies',
  description: 'Política de cookies de Viakasa.',
  path: '/cookies'
})

export default function CookiesPage() {
  return (
    <article className="legal-card">
      <h1>Política de cookies</h1>
      <p>
        Utilizamos cookies técnicas necesarias para el funcionamiento del sitio. Cualquier herramienta analítica o publicitaria se configurará con el consentimiento correspondiente.
      </p>
    </article>
  )
}
