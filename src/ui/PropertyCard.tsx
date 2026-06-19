import Image from 'next/image'
import Link from 'next/link'

import { formatPrice, operationLabel } from '@/src/lib/format'
import type { PublicProperty } from '@/src/lib/content'

export function PropertyCard({ property }: { property: PublicProperty }) {
  return (
    <Link className="property-card" href={`/propiedades/${property.slug}`}>
      <div className="property-image">
        <Image src={property.mainImageUrl} alt={property.title} width={820} height={560} />
        <span className="badge">{operationLabel(property.operation)}</span>
      </div>
      <div className="property-body">
        <div className="property-location">{property.location}</div>
        <h3>{property.title}</h3>
        <div>
          <span className="property-price">{formatPrice(property.price)}</span>
          {property.priceNote ? <span className="property-note"> · {property.priceNote}</span> : null}
        </div>
        <div className="features-row">
          <span><strong>{property.rooms || '-'}</strong> Hab.</span>
          <span><strong>{property.bathrooms || '-'}</strong> Baños</span>
          <span><strong>{property.area ? `${property.area} m²` : '-'}</strong> Sup.</span>
        </div>
      </div>
    </Link>
  )
}
