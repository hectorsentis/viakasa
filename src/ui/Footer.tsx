import Image from 'next/image'
import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'

import type { PublicSettings } from '@/src/lib/content'

export function Footer({ settings }: { settings: PublicSettings }) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Image className="footer-logo" src="/brand/viakasa-logo.png" alt="Viakasa" width={240} height={90} />
          <p>{settings.footerText}</p>
        </div>
        <div>
          <h3 className="footer-title">Empresa</h3>
          <ul className="footer-list">
            <li><Link href="/nosotros">Nosotros</Link></li>
            <li><Link href="/servicios">Servicios</Link></li>
            <li><Link href="/propiedades">Propiedades</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="footer-title">Legal</h3>
          <ul className="footer-list">
            <li><Link href="/aviso-legal">Aviso legal</Link></li>
            <li><Link href="/privacidad">Privacidad</Link></li>
            <li><Link href="/cookies">Cookies</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="footer-title">Contacto</h3>
          <ul className="footer-list">
            <li><Phone size={15} color="var(--gold-400)" /> {settings.phone}</li>
            <li><Mail size={15} color="var(--gold-400)" /> {settings.email}</li>
            <li><MapPin size={15} color="var(--gold-400)" /> {settings.offices}</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">© 2026 Viakasa Asesoría Inmobiliaria. Todos los derechos reservados.</div>
      </div>
    </footer>
  )
}
