'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

export function MobileMenuToggle({ ctaLabel }: { ctaLabel: string }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        className="hamburger-btn"
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={open}
      >
        {open ? <X size={26} /> : <Menu size={26} />}
      </button>
      {open && (
        <nav className="mobile-nav" aria-label="Menú principal">
          <Link href="/propiedades" onClick={() => setOpen(false)}>Propiedades</Link>
          <Link href="/servicios" onClick={() => setOpen(false)}>Servicios</Link>
          <Link href="/nosotros" onClick={() => setOpen(false)}>Nosotros</Link>
          <Link href="/contacto" onClick={() => setOpen(false)}>Contacto</Link>
          <Link className="button button-accent" href="/contacto" onClick={() => setOpen(false)}>
            {ctaLabel}
          </Link>
        </nav>
      )}
    </>
  )
}
