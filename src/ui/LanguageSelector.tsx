'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { translatePath, type Locale } from '@/src/i18n'

export function LanguageSelector({ locale }: { locale: Locale }) {
  const pathname = usePathname()
  return (
    <div className="language-selector" aria-label={locale === 'en' ? 'Language' : 'Idioma'}>
      <Link href={translatePath(pathname, 'es')} hrefLang="es" aria-current={locale === 'es' ? 'page' : undefined}>ES</Link>
      <span aria-hidden="true">/</span>
      <Link href={translatePath(pathname, 'en')} hrefLang="en" aria-current={locale === 'en' ? 'page' : undefined}>EN</Link>
    </div>
  )
}
