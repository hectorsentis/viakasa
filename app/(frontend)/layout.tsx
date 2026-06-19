import type { Metadata } from 'next'
import './globals.css'

import { Footer } from '@/src/ui/Footer'
import { Header } from '@/src/ui/Header'
import { getSiteSettings } from '@/src/lib/content'
import { defaultSeo, jsonLdScript, organizationJsonLd, siteUrl, websiteJsonLd } from '@/src/lib/seo'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultSeo.title,
    template: '%s · Viakasa'
  },
  description: defaultSeo.description,
  keywords: defaultSeo.keywords,
  applicationName: 'Viakasa',
  authors: [{ name: 'Viakasa' }],
  creator: 'Viakasa',
  publisher: 'Viakasa',
  category: 'Real estate',
  alternates: {
    canonical: siteUrl,
    languages: { 'es-ES': siteUrl }
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    }
  },
  icons: {
    icon: '/brand/viakasa-icon.png',
    apple: '/brand/viakasa-icon.png'
  },
  openGraph: {
    title: defaultSeo.title,
    description: defaultSeo.description,
    url: siteUrl,
    siteName: 'Viakasa',
    locale: 'es_ES',
    type: 'website',
    images: [{ url: '/brand/viakasa-logo-tagline.png', width: 1200, height: 630, alt: 'Viakasa' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultSeo.title,
    description: defaultSeo.description,
    images: ['/brand/viakasa-logo-tagline.png']
  }
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings()
  return (
    <html lang="es">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(organizationJsonLd(settings))} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(websiteJsonLd())} />
        <Header settings={settings} />
        <main>{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  )
}
