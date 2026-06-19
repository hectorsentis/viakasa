import type { CollectionConfig } from 'payload'

import { isOwnerOrEditor, publishedOrEditor } from '../access'
import { slugify } from '../utils/slugify'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Página',
    plural: 'Páginas'
  },
  access: {
    create: isOwnerOrEditor,
    delete: isOwnerOrEditor,
    read: publishedOrEditor,
    update: isOwnerOrEditor
  },
  admin: {
    defaultColumns: ['title', 'slug', 'status'],
    useAsTitle: 'title'
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
      label: 'Estado',
      defaultValue: 'published',
      required: true,
      options: [
        { label: 'Borrador', value: 'draft' },
        { label: 'Publicado', value: 'published' }
      ]
    },
    { name: 'title', type: 'text', label: 'Título', required: true },
    { name: 'slug', type: 'text', label: 'Slug', required: true, unique: true },
    { name: 'summary', type: 'textarea', label: 'Resumen' },
    { name: 'content', type: 'richText', label: 'Contenido' }
  ]
}
