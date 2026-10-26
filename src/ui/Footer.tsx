import Image from 'next/image'
import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'

import type { PublicSettings } from '@/src/lib/content'
import { copy, route, type Locale } from '@/src/i18n'

export function Footer({ settings, locale = 'es' }: { settings: PublicSettings; locale?: Locale }) {
  const t = copy[locale]
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Image className="footer-logo" src="/brand/viakasa-logo.png" alt="Viakasa" width={240} height={90} />
          <p>{settings.footerText}</p>
        </div>
        <div>
          <h3 className="footer-title">{t.footer.company}</h3>
          <ul className="footer-list">
            <li><Link href={route(locale, 'about')}>{t.nav.about}</Link></li>
            <li><Link href={route(locale, 'services')}>{t.nav.services}</Link></li>
            <li><Link href={route(locale, 'properties')}>{t.nav.properties}</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="footer-title">{t.footer.legal}</h3>
          <ul className="footer-list">
            <li><Link href={route(locale, 'legal')}>{t.footer.legalNotice}</Link></li>
            <li><Link href={route(locale, 'privacy')}>{t.footer.privacy}</Link></li>
            <li><Link href={route(locale, 'cookies')}>{t.footer.cookies}</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="footer-title">{t.footer.contact}</h3>
          <ul className="footer-list">
            <li><Phone size={15} color="var(--gold-400)" /> {settings.phone}</li>
            <li><Mail size={15} color="var(--gold-400)" /> {settings.email}</li>
            <li><MapPin size={15} color="var(--gold-400)" /> {settings.offices}</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">© {new Date().getFullYear()} Viakasa. {t.footer.rights}</div>
      </div>
    </footer>
  )
}
