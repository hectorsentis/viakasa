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
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
    bulkUpload: false
  },
  hooks: {
    beforeValidate: [
      ({ data, req }) => {
        const mimeType = req.file?.mimetype || data?.mimeType
        const size = req.file?.size || data?.filesize
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']
        if (mimeType && !allowedTypes.includes(mimeType)) throw new Error('Formato no permitido. Usa JPG, PNG, WebP o AVIF.')
        if (typeof size === 'number' && size > 20 * 1024 * 1024) throw new Error('La imagen supera el límite de 20 MB.')
        return data
      }
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
