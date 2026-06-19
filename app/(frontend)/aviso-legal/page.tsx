import type { Metadata } from 'next'

import { pageMetadata } from '@/src/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Aviso legal',
  description: 'Aviso legal de Viakasa Asesoría Inmobiliaria.',
  path: '/aviso-legal'
})

export default function LegalPage() {
  return (
    <article className="legal-card">
      <h1>Aviso legal</h1>
      <p>
        Este sitio web pertenece a Viakasa Asesoría Inmobiliaria. La información publicada tiene carácter orientativo y puede actualizarse sin previo aviso.
      </p>
    </article>
  )
}
