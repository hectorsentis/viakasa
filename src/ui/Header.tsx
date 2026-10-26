import Image from 'next/image'
import Link from 'next/link'

import type { PublicSettings } from '@/src/lib/content'
import { copy, route, type Locale } from '@/src/i18n'
import { LanguageSelector } from './LanguageSelector'
import { MobileMenuToggle } from './MobileMenuToggle'

export function Header({ settings, locale = 'es' }: { settings: PublicSettings; locale?: Locale }) {
  const t = copy[locale]
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand-link" href={route(locale, 'home')}>
          <Image className="brand-icon" src="/brand/viakasa-icon.png" alt="Viakasa" width={42} height={42} priority />
          <span className="brand-word">{settings.siteName}</span>
        </Link>
        <nav className="nav-links" aria-label="Principal">
          <Link href={route(locale, 'properties')}>{t.nav.properties}</Link>
          <Link href={route(locale, 'services')}>{t.nav.services}</Link>
          <Link href={route(locale, 'about')}>{t.nav.about}</Link>
          <Link href={route(locale, 'contact')}>{t.nav.contact}</Link>
          <LanguageSelector locale={locale} />
          <Link className="button button-accent" href={route(locale, 'contact')}>
            {settings.secondaryCta}
          </Link>
        </nav>
        <MobileMenuToggle ctaLabel={settings.secondaryCta} locale={locale} />
      </div>
    </header>
  )
}
