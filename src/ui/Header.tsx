import Image from 'next/image'
import Link from 'next/link'

import type { PublicSettings } from '@/src/lib/content'

export function Header({ settings }: { settings: PublicSettings }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand-link" href="/">
          <Image className="brand-icon" src="/brand/viakasa-icon.png" alt="Viakasa" width={42} height={42} priority />
          <span className="brand-word">{settings.siteName}</span>
        </Link>
        <nav className="nav-links" aria-label="Principal">
          <Link href="/propiedades">Propiedades</Link>
          <Link href="/servicios">Servicios</Link>
          <Link href="/nosotros">Nosotros</Link>
          <Link href="/contacto">Contacto</Link>
          <Link className="button button-accent" href="/contacto">
            {settings.secondaryCta}
          </Link>
        </nav>
      </div>
    </header>
  )
}
