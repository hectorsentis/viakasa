import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Viakasa · Asesoría inmobiliaria',
    short_name: 'Viakasa',
    description: 'Asesoría inmobiliaria integral en Madrid, Tenerife y toda España.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAF8F3',
    theme_color: '#0F2138',
    lang: 'es-ES',
    icons: [
      {
        src: '/brand/viakasa-icon.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  }
}
