import type { Locale } from '@/src/i18n'

export function formatPrice(price?: number | null, locale: Locale = 'es') {
  if (price == null) return locale === 'en' ? 'Price on request' : 'Precio a consultar'
  return new Intl.NumberFormat(locale === 'en' ? 'en-GB' : 'es-ES', {
    maximumFractionDigits: 0,
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}

export function mediaUrl(media: unknown, fallback = '') {
  if (!media || typeof media !== 'object') return fallback
  const item = media as { blobUrl?: string; url?: string }
  if (item.blobUrl?.startsWith('http')) return item.blobUrl
  if (item.url?.startsWith('http')) return item.url
  return item.blobUrl || item.url || fallback
}

export function operationLabel(value?: string, locale: Locale = 'es') {
  if (locale === 'en') {
    if (value === 'rent') return 'To let'
    if (value === 'sold') return 'Sold'
    return 'For sale'
  }
  if (value === 'rent') return 'En alquiler'
  if (value === 'sold') return 'Vendido'
  return 'En venta'
}
