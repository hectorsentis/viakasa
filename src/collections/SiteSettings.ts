import type { CollectionConfig } from 'payload'

import { isOwner } from '../access'

export const SiteSettings: CollectionConfig = {
  slug: 'site-settings',
  labels: {
    singular: 'Ajustes del sitio',
    plural: 'Ajustes del sitio'
  },
  access: {
    create: isOwner,
    delete: isOwner,
    read: () => true,
    update: isOwner
  },
  admin: {
    defaultColumns: ['siteName', 'phone', 'email'],
    useAsTitle: 'siteName'
  },
  fields: [
    { name: 'siteName', type: 'text', label: 'Nombre del sitio', defaultValue: 'Viakasa', required: true },
    { name: 'tagline', type: 'text', label: 'Lema', defaultValue: 'La vía directa a tu casa' },
    { name: 'taglineEn', type: 'text', label: 'Tagline (English)', defaultValue: 'The direct route to your home' },
    { name: 'heroTitle', type: 'text', label: 'Título principal', defaultValue: 'La vía directa a tu casa' },
    { name: 'heroTitleEn', type: 'text', label: 'Main title (English)', defaultValue: 'The direct route to your home' },
    {
      name: 'heroText',
      type: 'textarea',
      label: 'Texto principal',
      defaultValue:
        'Asesoría inmobiliaria integral: compra, venta, gestión legal y financiera con un único interlocutor de confianza.'
    },
    {
      name: 'heroTextEn',
      type: 'textarea',
      label: 'Main text (English)',
      defaultValue: 'Complete property advisory for buying, selling, legal services and finance, with one trusted point of contact.'
    },
    { name: 'heroImage', type: 'relationship', label: 'Imagen principal', relationTo: 'media' },
    { name: 'phone', type: 'text', label: 'Teléfono', defaultValue: '600 123 450' },
    { name: 'email', type: 'email', label: 'Email', defaultValue: 'info@viakasa.es' },
    { name: 'offices', type: 'text', label: 'Sedes', defaultValue: 'Madrid · Santa Cruz de Tenerife' },
    { name: 'officesEn', type: 'text', label: 'Offices (English)', defaultValue: 'Madrid · Santa Cruz de Tenerife' },
    { name: 'footerText', type: 'textarea', label: 'Texto de pie', defaultValue: 'Tu asesoría inmobiliaria de confianza.' },
    { name: 'footerTextEn', type: 'textarea', label: 'Footer text (English)', defaultValue: 'Your trusted property advisers.' },
    { name: 'primaryCta', type: 'text', label: 'CTA principal', defaultValue: 'Ver propiedades' },
    { name: 'primaryCtaEn', type: 'text', label: 'Primary CTA (English)', defaultValue: 'View properties' },
    { name: 'secondaryCta', type: 'text', label: 'CTA secundario', defaultValue: 'Valoración gratuita' },
    { name: 'secondaryCtaEn', type: 'text', label: 'Secondary CTA (English)', defaultValue: 'Free valuation' },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Redes sociales',
      fields: [
        { name: 'label', type: 'text', label: 'Nombre', required: true },
        { name: 'url', type: 'text', label: 'URL', required: true }
      ]
    }
  ]
}
