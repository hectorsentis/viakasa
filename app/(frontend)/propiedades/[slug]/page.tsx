import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Bath, BedDouble, Calendar, Check, Maximize2 } from 'lucide-react'

import { getProperty } from '@/src/lib/content'
import { formatPrice, operationLabel } from '@/src/lib/format'
import { breadcrumbJsonLd, jsonLdScript, pageMetadata, realEstateListingJsonLd } from '@/src/lib/seo'
import { ContactForm } from '@/src/ui/ContactForm'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const property = await getProperty(slug)
  if (!property) return {}
  return pageMetadata({
    title: property.title,
    description: property.description,
    path: `/propiedades/${property.slug}`,
    image: property.mainImageUrl
  })
}

export default async function PropertyDetailPage({ params }: Props) {
  const { slug } = await params
  const property = await getProperty(slug)
  if (!property) notFound()

  const gallery = property.galleryUrls?.length ? property.galleryUrls : [property.mainImageUrl]

  return (
    <section className="detail-hero">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(realEstateListingJsonLd(property))} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([
            { name: 'Inicio', path: '/' },
            { name: 'Propiedades', path: '/propiedades' },
            { name: property.title, path: `/propiedades/${property.slug}` }
          ])
        )}
      />
      <div className="container">
        <Link className="eyebrow" href="/propiedades"><ArrowLeft size={15} /> Volver a propiedades</Link>
        <div className="gallery" style={{ marginTop: 28 }}>
          <Image className="gallery-main" src={gallery[0]} alt={property.title} width={1200} height={760} priority />
          <div className="gallery-thumbs">
            {gallery.slice(0, 3).map((url) => (
              <Image className="gallery-thumb" key={url} src={url} alt="" width={360} height={220} />
            ))}
          </div>
        </div>
        <div className="detail-grid" style={{ alignItems: 'start' }}>
          <article>
            <span className="badge" style={{ position: 'static', display: 'inline-flex' }}>{operationLabel(property.operation)}</span>
            <p className="property-location" style={{ marginTop: 18 }}>{property.location}</p>
            <h1 className="section-title">{property.title}</h1>
            <div className="features-row" style={{ maxWidth: 680, borderBottom: '1px solid var(--border)', paddingBottom: 16 }}>
              <span><BedDouble size={17} color="var(--gold-600)" /><strong>{property.rooms || '-'}</strong> Habitaciones</span>
              <span><Bath size={17} color="var(--gold-600)" /><strong>{property.bathrooms || '-'}</strong> Baños</span>
              <span><Maximize2 size={17} color="var(--gold-600)" /><strong>{property.area ? `${property.area} m²` : '-'}</strong> Superficie</span>
              <span><Calendar size={17} color="var(--gold-600)" /><strong>{property.year || '-'}</strong> Año</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', marginTop: 34 }}>Descripción</h2>
            <p className="section-intro">{property.description}</p>
            <h2 style={{ fontFamily: 'var(--font-serif)', marginTop: 34 }}>Características</h2>
            <ul className="footer-list" style={{ color: 'var(--ink)', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
              {(property.features || []).map((feature) => (
                <li key={feature.label}><Check size={16} color="var(--gold-600)" /> {feature.label}</li>
              ))}
            </ul>
          </article>
          <aside className="detail-sidebar">
            <div className="contact-card" style={{ marginBottom: 18 }}>
              <p className="property-location">Precio</p>
              <div className="property-price" style={{ fontSize: 38 }}>{formatPrice(property.price)}</div>
              <p className="property-note">{property.priceNote}</p>
            </div>
            <ContactForm propertyId={property.id} />
          </aside>
        </div>
      </div>
    </section>
  )
}
