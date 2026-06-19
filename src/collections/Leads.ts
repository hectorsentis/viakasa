import type { CollectionConfig } from 'payload'

import { isOwnerOrEditor } from '../access'

export const Leads: CollectionConfig = {
  slug: 'leads',
  labels: {
    singular: 'Solicitud',
    plural: 'Solicitudes'
  },
  access: {
    create: () => true,
    delete: isOwnerOrEditor,
    read: isOwnerOrEditor,
    update: isOwnerOrEditor
  },
  admin: {
    defaultColumns: ['name', 'email', 'phone', 'interest', 'createdAt'],
    useAsTitle: 'name'
  },
  fields: [
    { name: 'name', type: 'text', label: 'Nombre', required: true },
    { name: 'email', type: 'email', label: 'Email', required: true },
    { name: 'phone', type: 'text', label: 'Teléfono' },
    { name: 'interest', type: 'text', label: 'Interés' },
    { name: 'message', type: 'textarea', label: 'Mensaje' },
    {
      name: 'property',
      type: 'relationship',
      label: 'Propiedad',
      relationTo: 'properties'
    },
    {
      name: 'source',
      type: 'select',
      label: 'Origen',
      defaultValue: 'contact',
      options: [
        { label: 'Contacto', value: 'contact' },
        { label: 'Propiedad', value: 'property' },
        { label: 'Valoración', value: 'valuation' }
      ]
    }
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation !== 'create' || !process.env.CONTACT_TO_EMAIL) return
        try {
          await req.payload.sendEmail({
            to: process.env.CONTACT_TO_EMAIL,
            subject: `Nueva solicitud de ${doc.name}`,
            text: [
              `Nombre: ${doc.name}`,
              `Email: ${doc.email}`,
              `Teléfono: ${doc.phone || 'No indicado'}`,
              `Interés: ${doc.interest || 'No indicado'}`,
              `Mensaje: ${doc.message || 'Sin mensaje'}`
            ].join('\n')
          })
        } catch {
          req.payload.logger.warn('No se pudo enviar el aviso de una nueva solicitud.')
        }
      }
    ]
  }
}
