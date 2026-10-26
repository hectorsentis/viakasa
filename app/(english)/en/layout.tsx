import type { Metadata } from 'next'
import '../../(frontend)/globals.css'

import { Footer } from '@/src/ui/Footer'
import { Header } from '@/src/ui/Header'
import { getSiteSettings } from '@/src/lib/content'
import { siteUrl } from '@/src/lib/seo'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Viakasa · Property advisers in Madrid and Tenerife', template: '%s · Viakasa' },
  description: 'Complete property advisory for buying, selling and managing homes in Madrid, Tenerife and across Spain.',
  alternates: { canonical: `${siteUrl}/en`, languages: { 'es-ES': siteUrl, 'en-GB': `${siteUrl}/en` } },
  openGraph: { locale: 'en_GB', siteName: 'Viakasa', type: 'website' }
}

export default async function EnglishLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings('en')
  return (
    <html lang="en">
      <body>
        <Header settings={settings} locale="en" />
        <main>{children}</main>
        <Footer settings={settings} locale="en" />
      </body>
    </html>
  )
}
