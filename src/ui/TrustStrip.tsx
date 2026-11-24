import { FileCheck2, MessagesSquare, Scale, Signature, type LucideIcon } from 'lucide-react'

import type { Locale } from '@/src/i18n'

// Atributos de servicio, no métricas: no se incluyen cifras ni afirmaciones
// comerciales que no puedan verificarse.
const attributes: Record<Locale, Array<{ icon: LucideIcon; label: string }>> = {
  es: [
    { icon: MessagesSquare, label: 'Asesoramiento personalizado' },
    { icon: Scale, label: 'Respaldo jurídico' },
    { icon: FileCheck2, label: 'Seguridad documental' },
    { icon: Signature, label: 'Acompañamiento hasta la firma' }
  ],
  en: [
    { icon: MessagesSquare, label: 'Personal advice' },
    { icon: Scale, label: 'Legal backing' },
    { icon: FileCheck2, label: 'Document security' },
    { icon: Signature, label: 'Support through to signing' }
  ]
}

export function TrustStrip({ locale = 'es' }: { locale?: Locale }) {
  return (
    <section className="trust-strip" aria-label={locale === 'en' ? 'How we work' : 'Cómo trabajamos'}>
      <ul className="container trust-grid">
        {attributes[locale].map(({ icon: Icon, label }) => (
          <li key={label}>
            <Icon aria-hidden="true" size={28} strokeWidth={1.25} color="var(--gold-400)" />
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
