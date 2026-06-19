import type { Metadata } from 'next'
import './globals.css'

import { Footer } from '@/src/ui/Footer'
import { Header } from '@/src/ui/Header'
import { getSiteSettings } from '@/src/lib/content'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.viakasa.es'),
  title: {
    default: 'Viakasa · Asesoría inmobiliaria',
    template: '%s · Viakasa'
  },
  description: 'Asesoría inmobiliaria integral en Madrid, Tenerife y toda España.',
  icons: {
    icon: '/brand/viakasa-icon.png'
  },
  openGraph: {
    title: 'Viakasa',
    description: 'La vía directa a tu casa.',
    images: ['/brand/viakasa-logo-tagline.png']
  }
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings()
  return (
    <html lang="es">
      <body>
        <Header settings={settings} />
        <main>{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  )
}
