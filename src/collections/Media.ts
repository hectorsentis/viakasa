import type { CollectionConfig } from 'payload'
import { v2 as cloudinary } from 'cloudinary'

import { isOwnerOrEditor } from '../access'

function uploadToCloudinary(buffer: Buffer, folder: string): Promise<{ secure_url: string; public_id: string }> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder, resource_type: 'image' }, (error, result) => {
      if (error || !result) reject(error || new Error('No se recibió respuesta de Cloudinary.'))
      else resolve({ secure_url: result.secure_url, public_id: result.public_id })
    })
    stream.end(buffer)
  })
}

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
    defaultColumns: ['alt', 'cloudinaryUrl', 'updatedAt'],
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
        if (operation !== 'create' || doc.cloudinaryUrl || !file?.data) return
        if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) return

        cloudinary.config({
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
          api_key: process.env.CLOUDINARY_API_KEY,
          api_secret: process.env.CLOUDINARY_API_SECRET
        })

        try {
          const uploaded = await uploadToCloudinary(file.data, process.env.CLOUDINARY_FOLDER || 'viakasa')
          await req.payload.update({
            collection: 'media',
            id: doc.id,
            data: {
              cloudinaryUrl: uploaded.secure_url,
              cloudinaryPublicId: uploaded.public_id
            },
            overrideAccess: true
          })
        } catch {
          req.payload.logger.warn('La imagen se guardó localmente, pero no se pudo publicar en Cloudinary.')
        }
      }
    ],
    afterDelete: [
      async ({ doc, req }) => {
        if (!doc.cloudinaryPublicId || !process.env.CLOUDINARY_CLOUD_NAME) return
        cloudinary.config({
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
          api_key: process.env.CLOUDINARY_API_KEY,
          api_secret: process.env.CLOUDINARY_API_SECRET
        })
        try {
          await cloudinary.uploader.destroy(doc.cloudinaryPublicId)
        } catch {
          req.payload.logger.warn('No se pudo eliminar la imagen de Cloudinary.')
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
      name: 'cloudinaryUrl',
      type: 'text',
      label: 'URL de Cloudinary',
      admin: {
        description: 'Se usa en producción cuando el archivo está publicado en Cloudinary.'
      }
    },
    {
      name: 'cloudinaryPublicId',
      type: 'text',
      label: 'ID público de Cloudinary',
      admin: {
        readOnly: true
      }
    }
  ]
}
