export function formatPrice(price?: number | null) {
  if (price == null) return 'Precio a consultar'
  return new Intl.NumberFormat('es-ES', {
    maximumFractionDigits: 0,
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}

export function mediaUrl(media: unknown, fallback = '') {
  if (!media || typeof media !== 'object') return fallback
  const item = media as { blobUrl?: string; url?: string }
  return item.blobUrl || item.url || fallback
}

export function operationLabel(value?: string) {
  if (value === 'rent') return 'En alquiler'
  if (value === 'sold') return 'Vendido'
  return 'En venta'
}
