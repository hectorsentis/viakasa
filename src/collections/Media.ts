import type { CollectionConfig } from 'payload'
import { del, put } from '@vercel/blob'

import { isOwnerOrEditor } from '../access'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Medio',
    plural: 'Medios'
  },
  access: {
    create: isOwnerOrEditor,
    delete: isOwnerOrEditor,
    read: () => true,
    update: isOwnerOrEditor
  },
  admin: {
    defaultColumns: ['alt', 'blobUrl', 'updatedAt'],
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
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        const file = req.file as { data?: Buffer } | undefined
        if (operation !== 'create' || doc.blobUrl || !file?.data || !process.env.BLOB_READ_WRITE_TOKEN) return

        try {
          const uploaded = await put(`propiedades/${doc.filename || doc.id}`, file.data, {
            access: 'public',
            addRandomSuffix: true,
            contentType: doc.mimeType || 'application/octet-stream'
          })
          await req.payload.update({
            collection: 'media',
            id: doc.id,
            data: {
              blobUrl: uploaded.url,
              blobPathname: uploaded.pathname
            },
            overrideAccess: true
          })
        } catch {
          req.payload.logger.warn('La imagen se guardó localmente, pero no se pudo publicar en Vercel Blob.')
        }
      }
    ],
    afterDelete: [
      async ({ doc, req }) => {
        if (!doc.blobUrl || !process.env.BLOB_READ_WRITE_TOKEN) return
        try {
          await del(doc.blobUrl)
        } catch {
          req.payload.logger.warn('No se pudo eliminar la imagen de Vercel Blob.')
        }
      }
    ]
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Texto alternativo',
      required: true
    },
    {
      name: 'blobUrl',
      type: 'text',
      label: 'URL de Vercel Blob',
      admin: {
        description: 'Se usa en producción cuando el archivo está publicado en Vercel Blob.'
      }
    },
    {
      name: 'blobPathname',
      type: 'text',
      label: 'Ruta en Vercel Blob',
      admin: {
        readOnly: true
      }
    }
  ]
}
