import type { CollectionConfig } from 'payload'

import { isOwnerOrEditor } from '../access'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'Servicio',
    plural: 'Servicios'
  },
  access: {
    create: isOwnerOrEditor,
    delete: isOwnerOrEditor,
    read: () => true,
    update: isOwnerOrEditor
  },
  admin: {
    defaultColumns: ['title', 'icon', 'order'],
    useAsTitle: 'title'
  },
  fields: [
    { name: 'title', type: 'text', label: 'Título', required: true },
    { name: 'description', type: 'textarea', label: 'Descripción', required: true },
    { name: 'icon', type: 'text', label: 'Icono Lucide', defaultValue: 'home', required: true },
    { name: 'order', type: 'number', label: 'Orden', defaultValue: 0 },
    { name: 'highlighted', type: 'checkbox', label: 'Destacar' }
  ]
}
