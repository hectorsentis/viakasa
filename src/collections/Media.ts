import type { CollectionConfig } from 'payload'

import { isOwnerOrEditor } from '../access'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Medio', plural: 'Medios' },
  access: {
    create: isOwnerOrEditor,
    delete: isOwnerOrEditor,
    read: () => true,
    update: isOwnerOrEditor
  },
  admin: {
    defaultColumns: ['alt', 'filename', 'updatedAt'],
    useAsTitle: 'alt'
  },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*'],
    imageSizes: [
      { name: 'card', width: 820, height: 560, position: 'centre' },
      { name: 'hero', width: 1600, height: 980, position: 'centre' }
    ]
  },
  fields: [
    { name: 'alt', type: 'text', label: 'Texto alternativo', required: true },
    {
      name: 'altEn',
      type: 'text',
      label: 'Alternative text (English)',
      admin: { description: 'Opcional. Si se deja vacío, se usará el texto en español.' }
    },
    {
      name: 'blobUrl',
      type: 'text',
      admin: { hidden: true, readOnly: true }
    },
    {
      name: 'blobPathname',
      type: 'text',
      admin: { hidden: true, readOnly: true }
    }
  ]
}
