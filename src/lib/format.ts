import type { Locale } from '@/src/i18n'

const numberLocale = (locale: Locale) => (locale === 'en' ? 'en-GB' : 'es-ES')

export function formatPrice(price?: number | null, locale: Locale = 'es') {
  if (price == null) return locale === 'en' ? 'Price on request' : 'Precio a consultar'
  return new Intl.NumberFormat(numberLocale(locale), {
    maximumFractionDigits: 0,
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}

/** «5.105 €/m²» (venta) o «18 €/m²/mes» (alquiler). */
export function formatPricePerSqm(value?: number | null, operation?: string | null, locale: Locale = 'es') {
  if (!value) return ''
  // es-ES no agrupa los números de 4 cifras con Intl («6000»); se agrupa siempre para mantener el formato «5.105 €/m²».
  const amount = Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, locale === 'en' ? ',' : '.')
  const unit = operation === 'rent' ? (locale === 'en' ? '€/m²/month' : '€/m²/mes') : '€/m²'
  return `${amount} ${unit}`
}

export function mediaUrl(media: unknown, fallback = '') {
  if (!media || typeof media !== 'object') return fallback
  const item = media as { blobUrl?: string; url?: string }
  if (item.blobUrl?.startsWith('http')) return item.blobUrl
  if (item.url?.startsWith('http')) return item.url
  return item.blobUrl || item.url || fallback
}

export function operationLabel(value?: string | null, locale: Locale = 'es') {
  if (locale === 'en') return value === 'rent' ? 'To let' : 'For sale'
  return value === 'rent' ? 'En alquiler' : 'En venta'
}

const commercialLabels: Record<Locale, Record<string, string>> = {
  es: { reserved: 'Reservado', sold: 'Vendido', rented: 'Alquilado' },
  en: { reserved: 'Reserved', sold: 'Sold', rented: 'Let' }
}

/** Etiqueta del distintivo público: el estado comercial prevalece sobre la operación. */
export function listingBadge(property: { operation?: string | null; commercialStatus?: string | null }, locale: Locale = 'es') {
  const status = property.commercialStatus
  if (status && status !== 'available' && commercialLabels[locale][status]) return commercialLabels[locale][status]
  return operationLabel(property.operation, locale)
}

export function isNoLongerAvailable(status?: string | null) {
  return status === 'sold' || status === 'rented'
}
