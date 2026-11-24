import Link from 'next/link'
import { ArrowLeft, Bath, BedDouble, Calendar, Check, MapPin, Maximize2, Ruler } from 'lucide-react'

import type { PublicProperty } from '@/src/lib/content'
import { formatPrice, formatPricePerSqm, listingBadge } from '@/src/lib/format'
import { route, type Locale } from '@/src/i18n'
import { ContactForm } from '@/src/ui/ContactForm'
import { PropertyGallery } from '@/src/ui/PropertyGallery'

const text = {
  es: {
    back: 'Volver a propiedades', bedrooms: 'Habitaciones', bathrooms: 'Baños', built: 'Construidos', usable: 'Útiles', year: 'Año',
    description: 'Descripción', features: 'Características', price: 'Precio', reference: 'Referencia', energy: 'Certificación energética',
    consumption: 'Consumo', emissions: 'Emisiones', pending: 'En trámite', exempt: 'Exento', location: 'Ubicación', map: 'Ver en el mapa'
  },
  en: {
    back: 'Back to properties', bedrooms: 'Bedrooms', bathrooms: 'Bathrooms', built: 'Built area', usable: 'Usable area', year: 'Year',
    description: 'Description', features: 'Features', price: 'Price', reference: 'Reference', energy: 'Energy performance certificate',
    consumption: 'Consumption', emissions: 'Emissions', pending: 'In progress', exempt: 'Exempt', location: 'Location', map: 'View on map'
  }
} as const

function EnergyCertificate({ energy, t }: { energy: PublicProperty['energy']; t: (typeof text)[Locale] }) {
  if (!energy?.status) return null
  let content: string
  if (energy.status === 'pending') content = t.pending
  else if (energy.status === 'exempt') content = t.exempt
  else {
    const parts = [
      energy.consumptionRating ? `${t.consumption}: ${energy.consumptionRating}${energy.consumption ? ` (${energy.consumption} kWh/m²)` : ''}` : '',
      energy.emissionsRating ? `${t.emissions}: ${energy.emissionsRating}${energy.emissions ? ` (${energy.emissions} kg CO₂/m²)` : ''}` : ''
    ].filter(Boolean)
    if (!parts.length) return null
    content = parts.join(' · ')
  }
  return (
    <>
      <h2 style={{ fontFamily: 'var(--font-serif)', marginTop: 34 }}>{t.energy}</h2>
      <p className="section-intro">{content}</p>
    </>
  )
}

export function PropertyDetail({ property, locale = 'es', banner }: { property: PublicProperty; locale?: Locale; banner?: React.ReactNode }) {
  const t = text[locale]
  const perSqm = formatPricePerSqm(property.pricePerSqm, property.operation, locale)
  // Una nota antigua tipo «5.105 €/m²» duplicaría el cálculo automático: se omite (el dato se conserva).
  const hasExactLocation = property.showExactLocation && (property.address || (property.latitude != null && property.longitude != null))
  const mapUrl = property.latitude != null && property.longitude != null
    ? `https://www.openstreetmap.org/?mlat=${property.latitude}&mlon=${property.longitude}#map=17/${property.latitude}/${property.longitude}`
    : null

  return (
    <div className="container">
      {banner}
      <Link className="eyebrow" href={route(locale, 'properties')}><ArrowLeft size={15} /> {t.back}</Link>
      <div style={{ marginTop: 28 }}>
        <PropertyGallery mainImage={{ url: property.mainImageUrl, alt: property.mainImageAlt || property.title }} gallery={property.galleryImages} title={property.title} locale={locale} />
      </div>
      <div className="detail-grid" style={{ alignItems: 'start' }}>
        <article>
          <span className="badge" style={{ position: 'static', display: 'inline-flex' }}>{listingBadge(property, locale)}</span>
          <p className="property-location" style={{ marginTop: 18 }}>{property.location}</p>
          <h1 className="section-title">{property.title}</h1>
          <div className="features-row" style={{ maxWidth: 680, borderBottom: '1px solid var(--border)', paddingBottom: 16 }}>
            <span><BedDouble size={17} color="var(--gold-600)" /><strong>{property.rooms || '-'}</strong> {t.bedrooms}</span>
            <span><Bath size={17} color="var(--gold-600)" /><strong>{property.bathrooms || '-'}</strong> {t.bathrooms}</span>
            <span><Maximize2 size={17} color="var(--gold-600)" /><strong>{property.area ? `${property.area} m²` : '-'}</strong> {t.built}</span>
            {property.usableArea ? <span><Ruler size={17} color="var(--gold-600)" /><strong>{property.usableArea} m²</strong> {t.usable}</span> : null}
            <span><Calendar size={17} color="var(--gold-600)" /><strong>{property.year || '-'}</strong> {t.year}</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', marginTop: 34 }}>{t.description}</h2>
          <p className="section-intro property-description">{property.description}</p>
          {property.features?.length ? (
            <>
              <h2 style={{ fontFamily: 'var(--font-serif)', marginTop: 34 }}>{t.features}</h2>
              <ul className="footer-list" style={{ color: 'var(--ink)', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
                {property.features.map((feature) => (
                  <li key={feature.label}><Check size={16} color="var(--gold-600)" /> {feature.label}</li>
                ))}
              </ul>
            </>
          ) : null}
          <EnergyCertificate energy={property.energy} t={t} />
          {hasExactLocation ? (
            <>
              <h2 style={{ fontFamily: 'var(--font-serif)', marginTop: 34 }}>{t.location}</h2>
              <p className="section-intro" style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                <MapPin size={17} color="var(--gold-600)" />
                {[property.address, property.postalCode].filter(Boolean).join(', ')}
                {mapUrl ? <a href={mapUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>{t.map}</a> : null}
              </p>
            </>
          ) : null}
        </article>
        <aside className="detail-sidebar">
          <div className="contact-card" style={{ marginBottom: 18 }}>
            <p className="property-location">{t.price}</p>
            <div className="property-price" style={{ fontSize: 38 }}>{formatPrice(property.price, locale)}</div>
            {perSqm ? <p className="property-note">{perSqm}</p> : null}
            {property.priceNote && !(perSqm && property.priceNote.includes('€/m')) ? <p className="property-note">{property.priceNote}</p> : null}
            {property.reference ? <p className="property-note">{t.reference}: {property.reference}</p> : null}
          </div>
          <ContactForm propertyId={String(property.id)} locale={locale} />
        </aside>
      </div>
    </div>
  )
}
