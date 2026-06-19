import type { CollectionConfig } from 'payload'

import { isOwnerOrEditor, publishedOrEditor } from '../access'
import { slugify } from '../utils/slugify'

export const Properties: CollectionConfig = {
  slug: 'properties',
  labels: {
    singular: 'Propiedad',
    plural: 'Propiedades'
  },
  admin: {
    defaultColumns: ['title', 'city', 'price', 'status', 'featured'],
    useAsTitle: 'title'
  },
  access: {
    create: isOwnerOrEditor,
    delete: isOwnerOrEditor,
    read: publishedOrEditor,
    update: isOwnerOrEditor
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data && !data.slug && data.title) data.slug = slugify(data.title)
        return data
      }
    ]
  },
  fields: [
    {
      name: 'status',
      type: 'select',
      label: 'Estado de publicación',
      defaultValue: 'draft',
      required: true,
      options: [
        { label: 'Borrador', value: 'draft' },
        { label: 'Publicado', value: 'published' }
      ]
    },
    { name: 'featured', type: 'checkbox', label: 'Destacada' },
    { name: 'title', type: 'text', label: 'Título', required: true },
    { name: 'slug', type: 'text', label: 'Slug', required: true, unique: true },
    { name: 'location', type: 'text', label: 'Zona y ubicación', required: true },
    {
      name: 'city',
      type: 'select',
      label: 'Ciudad',
      required: true,
      options: ['Madrid', 'Tenerife', 'Otra']
    },
    { name: 'price', type: 'number', label: 'Precio', min: 0 },
    { name: 'priceNote', type: 'text', label: 'Nota de precio' },
    {
      name: 'operation',
      type: 'select',
      label: 'Operación',
      defaultValue: 'sale',
      required: true,
      options: [
        { label: 'Venta', value: 'sale' },
        { label: 'Alquiler', value: 'rent' },
        { label: 'Vendido', value: 'sold' }
      ]
    },
    { name: 'propertyType', type: 'text', label: 'Tipo de inmueble', required: true },
    { name: 'rooms', type: 'number', label: 'Habitaciones', min: 0 },
    { name: 'bathrooms', type: 'number', label: 'Baños', min: 0 },
    { name: 'area', type: 'number', label: 'Superficie en m²', min: 0 },
    { name: 'year', type: 'number', label: 'Año', min: 1800 },
    { name: 'description', type: 'textarea', label: 'Descripción', required: true },
    {
      name: 'features',
      type: 'array',
      label: 'Características',
      fields: [{ name: 'label', type: 'text', label: 'Característica', required: true }]
    },
    {
      name: 'mainImage',
      type: 'relationship',
      label: 'Imagen principal',
      relationTo: 'media',
      required: true
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Galería',
      fields: [
        {
          name: 'image',
          type: 'relationship',
          label: 'Imagen',
          relationTo: 'media',
          required: true
        }
      ]
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        { name: 'title', type: 'text', label: 'Título SEO' },
        { name: 'description', type: 'textarea', label: 'Descripción SEO' }
      ]
    }
  ]
}
