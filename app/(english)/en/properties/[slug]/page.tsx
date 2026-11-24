import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getProperty } from '@/src/lib/content'
import { PropertyDetail } from '@/src/ui/PropertyDetail'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const property = await getProperty(slug, 'en')
  if (!property) return {}
  return {
    title: property.seo?.title || property.title,
    description: property.seo?.description || property.description,
    alternates: { canonical: `/en/properties/${slug}`, languages: { 'es-ES': `/propiedades/${slug}`, 'en-GB': `/en/properties/${slug}` } },
    openGraph: { images: [property.mainImageUrl] },
    ...(property.seo?.noIndex ? { robots: { index: false, follow: true } } : {})
  }
}

export default async function PropertyDetailPage({ params }: Props) {
  const { slug } = await params
  const property = await getProperty(slug, 'en')
  if (!property) notFound()
  return <section className="detail-hero"><PropertyDetail property={property} locale="en" /></section>
}
