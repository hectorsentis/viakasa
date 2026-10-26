'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { copy, route, type Locale } from '@/src/i18n'
import { LanguageSelector } from './LanguageSelector'

export function MobileMenuToggle({ ctaLabel, locale = 'es' }: { ctaLabel: string; locale?: Locale }) {
  const [open, setOpen] = useState(false)
  const t = copy[locale]
  return (
    <>
      <button
        className="hamburger-btn"
        onClick={() => setOpen(!open)}
        aria-label={open ? t.menu.close : t.menu.open}
        aria-expanded={open}
      >
        {open ? <X size={26} /> : <Menu size={26} />}
      </button>
      {open && (
        <nav className="mobile-nav" aria-label={t.menu.label}>
          <Link href={route(locale, 'properties')} onClick={() => setOpen(false)}>{t.nav.properties}</Link>
          <Link href={route(locale, 'services')} onClick={() => setOpen(false)}>{t.nav.services}</Link>
          <Link href={route(locale, 'about')} onClick={() => setOpen(false)}>{t.nav.about}</Link>
          <Link href={route(locale, 'contact')} onClick={() => setOpen(false)}>{t.nav.contact}</Link>
          <LanguageSelector locale={locale} />
          <Link className="button button-accent" href={route(locale, 'contact')} onClick={() => setOpen(false)}>
            {ctaLabel}
          </Link>
        </nav>
      )}
    </>
  )
}
