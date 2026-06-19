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
    { name: 'heroTitle', type: 'text', label: 'Título principal', defaultValue: 'La vía directa a tu casa' },
    {
      name: 'heroText',
      type: 'textarea',
      label: 'Texto principal',
      defaultValue:
        'Asesoría inmobiliaria integral: compra, venta, gestión legal y financiera con un único interlocutor de confianza.'
    },
    { name: 'heroImage', type: 'relationship', label: 'Imagen principal', relationTo: 'media' },
    { name: 'phone', type: 'text', label: 'Teléfono', defaultValue: '600 123 450' },
    { name: 'email', type: 'email', label: 'Email', defaultValue: 'info@viakasa.es' },
    { name: 'offices', type: 'text', label: 'Sedes', defaultValue: 'Madrid · Santa Cruz de Tenerife' },
    { name: 'footerText', type: 'textarea', label: 'Texto de pie', defaultValue: 'Tu asesoría inmobiliaria de confianza.' },
    { name: 'primaryCta', type: 'text', label: 'CTA principal', defaultValue: 'Ver propiedades' },
    { name: 'secondaryCta', type: 'text', label: 'CTA secundario', defaultValue: 'Valoración gratuita' },
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
