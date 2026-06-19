import '@payloadcms/next/css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Administración · Viakasa'
}

export default function PayloadLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
