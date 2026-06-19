import type { Metadata } from 'next'

import { pageMetadata } from '@/src/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Política de privacidad',
  description: 'Política de privacidad y tratamiento de datos de Viakasa.',
  path: '/privacidad'
})

export default function PrivacyPage() {
  return (
    <article className="legal-card">
      <h1>Política de privacidad</h1>
      <p>
        Tratamos los datos que nos facilitas únicamente para atender tu solicitud inmobiliaria y responder a tus consultas. Puedes solicitar acceso, rectificación o supresión escribiendo a Viakasa.
      </p>
    </article>
  )
}
