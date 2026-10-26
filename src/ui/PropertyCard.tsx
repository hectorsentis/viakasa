import Image from 'next/image'
import Link from 'next/link'

import { formatPrice, operationLabel } from '@/src/lib/format'
import type { PublicProperty } from '@/src/lib/content'
import { route, type Locale } from '@/src/i18n'

export function PropertyCard({ property, locale = 'es' }: { property: PublicProperty; locale?: Locale }) {
  return (
    <Link className="property-card" href={`${route(locale, 'properties')}/${property.slug}`}>
      <div className="property-image">
        <Image src={property.mainImageUrl} alt={property.title} width={820} height={560} />
        <span className="badge">{operationLabel(property.operation, locale)}</span>
      </div>
      <div className="property-body">
        <div className="property-location">{property.location}</div>
        <h3>{property.title}</h3>
        <div>
          <span className="property-price">{formatPrice(property.price, locale)}</span>
          {property.priceNote ? <span className="property-note"> · {property.priceNote}</span> : null}
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
