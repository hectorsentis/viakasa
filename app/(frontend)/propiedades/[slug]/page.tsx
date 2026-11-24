import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getProperty } from '@/src/lib/content'
import { breadcrumbJsonLd, jsonLdScript, pageMetadata, realEstateListingJsonLd } from '@/src/lib/seo'
import { PropertyDetail } from '@/src/ui/PropertyDetail'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const property = await getProperty(slug)
  if (!property) return {}
  const metadata = pageMetadata({
    title: property.seo?.title || property.title,
    description: property.seo?.description || property.description,
    path: `/propiedades/${property.slug}`,
    image: property.mainImageUrl
  })
  return property.seo?.noIndex ? { ...metadata, robots: { index: false, follow: true } } : metadata
}

export default async function PropertyDetailPage({ params }: Props) {
  const { slug } = await params
  const property = await getProperty(slug)
  if (!property) notFound()

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
      <PropertyDetail property={property} />
    </section>
  )
}
