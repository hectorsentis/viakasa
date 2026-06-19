import type { Metadata } from 'next'

import type { PublicProperty, PublicSettings } from '@/src/lib/content'
import { formatPrice, operationLabel } from '@/src/lib/format'

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.viakasa.es').replace(/\/$/, '')

export const defaultSeo = {
  title: 'Viakasa · Asesoría inmobiliaria en Madrid y Tenerife',
  description:
    'Asesoría inmobiliaria integral para comprar, vender y gestionar viviendas en Madrid, Tenerife y toda España con respaldo legal y financiero.',
  keywords: [
    'Viakasa',
    'asesoría inmobiliaria',
    'inmobiliaria Madrid',
    'inmobiliaria Tenerife',
    'comprar vivienda Madrid',
    'comprar vivienda Tenerife',
    'vender vivienda',
    'valoración inmobiliaria',
    'asesoría legal inmobiliaria',
    'financiación hipotecaria'
  ]
}

export function absoluteUrl(path = '/') {
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`
}

export function pageMetadata({
  title,
  description,
  path = '/',
  image = '/brand/viakasa-logo-tagline.png',
  type = 'website'
}: {
  title: string
  description: string
  path?: string
  image?: string
  type?: 'website' | 'article'
}): Metadata {
  const url = absoluteUrl(path)
  return {
    title,
    description,
    keywords: defaultSeo.keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Viakasa',
      locale: 'es_ES',
      type,
      images: [{ url: image, width: 1200, height: 630, alt: title }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image]
    }
  }
}

export function organizationJsonLd(settings: PublicSettings) {
  return {
    '@context': 'https://schema.org',
    '@type': ['RealEstateAgent', 'LocalBusiness'],
    '@id': absoluteUrl('/#organization'),
    name: settings.siteName,
    alternateName: 'Viakasa Asesoría Inmobiliaria',
    url: siteUrl,
    logo: absoluteUrl('/brand/viakasa-logo-tagline.png'),
    image: absoluteUrl('/brand/viakasa-logo-tagline.png'),
    slogan: settings.tagline,
    description: defaultSeo.description,
    telephone: settings.phone,
    email: settings.email,
    areaServed: ['Madrid', 'Tenerife', 'España'],
    address: [
      { '@type': 'PostalAddress', addressLocality: 'Madrid', addressCountry: 'ES' },
      { '@type': 'PostalAddress', addressLocality: 'Santa Cruz de Tenerife', addressCountry: 'ES' }
    ],
    knowsAbout: [
      'compraventa inmobiliaria',
      'valoración de viviendas',
      'asesoría legal inmobiliaria',
      'financiación hipotecaria',
      'gestión de inmuebles'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: settings.phone,
      email: settings.email,
      contactType: 'Atención comercial',
      areaServed: 'ES',
      availableLanguage: ['es']
    }
  }
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': absoluteUrl('/#website'),
    url: siteUrl,
    name: 'Viakasa',
    inLanguage: 'es-ES',
    publisher: { '@id': absoluteUrl('/#organization') },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${absoluteUrl('/propiedades')}?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  }
}

export function realEstateListingJsonLd(property: PublicProperty) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': absoluteUrl(`/propiedades/${property.slug}#listing`),
    name: property.title,
    description: property.description,
    image: property.galleryUrls?.length ? property.galleryUrls : [property.mainImageUrl],
    url: absoluteUrl(`/propiedades/${property.slug}`),
    category: property.propertyType,
    brand: { '@id': absoluteUrl('/#organization') },
    offers: {
      '@type': 'Offer',
      price: property.price || undefined,
      priceCurrency: 'EUR',
      availability: property.operation === 'sold' ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock',
      url: absoluteUrl(`/propiedades/${property.slug}`),
      itemCondition: 'https://schema.org/UsedCondition'
    },
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Operación', value: operationLabel(property.operation) },
      { '@type': 'PropertyValue', name: 'Ubicación', value: property.location },
      { '@type': 'PropertyValue', name: 'Habitaciones', value: property.rooms },
      { '@type': 'PropertyValue', name: 'Baños', value: property.bathrooms },
      { '@type': 'PropertyValue', name: 'Superficie', value: property.area ? `${property.area} m²` : undefined },
      { '@type': 'PropertyValue', name: 'Precio', value: formatPrice(property.price) }
    ].filter((item) => item.value !== undefined)
  }
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  }
}

export function jsonLdScript(data: unknown) {
  return {
    __html: JSON.stringify(data).replace(/</g, '\\u003c')
  }
}
