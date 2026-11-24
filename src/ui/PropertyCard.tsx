import Image from 'next/image'
import Link from 'next/link'

import { formatPrice, formatPricePerSqm, listingBadge } from '@/src/lib/format'
import type { PublicProperty } from '@/src/lib/content'
import { route, type Locale } from '@/src/i18n'

export function PropertyCard({ property, locale = 'es' }: { property: PublicProperty; locale?: Locale }) {
  const note = formatPricePerSqm(property.pricePerSqm, property.operation, locale) || property.priceNote
  return (
    <Link className="property-card" href={`${route(locale, 'properties')}/${property.slug}`}>
      <div className="property-image">
        <Image src={property.mainImageUrl} alt={property.mainImageAlt || property.title} width={820} height={560} />
        <span className="badge">{listingBadge(property, locale)}</span>
      </div>
      <div className="property-body">
        <div className="property-location">{property.location}</div>
        <h3>{property.title}</h3>
        <div>
          <span className="property-price">{formatPrice(property.price, locale)}</span>
          {note ? <span className="property-note"> · {note}</span> : null}
        </div>
        <div className="features-row">
          <span><strong>{property.rooms || '-'}</strong> {locale === 'en' ? 'Beds' : 'Hab.'}</span>
          <span><strong>{property.bathrooms || '-'}</strong> {locale === 'en' ? 'Baths' : 'Baños'}</span>
          <span><strong>{property.area ? `${property.area} m²` : '-'}</strong> {locale === 'en' ? 'Area' : 'Sup.'}</span>
        </div>
      </div>
    </Link>
  )
}
