import type { CollectionConfig } from 'payload'

import { isOwner } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    defaultColumns: ['name', 'email', 'role'],
    useAsTitle: 'email'
  },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
    tokenExpiration: 60 * 60 * 8,
    verify: false
  },
  access: {
    create: isOwner,
    delete: isOwner,
    read: ({ req }) => {
      if (req.user?.role === 'owner') return true
      return {
        id: {
          equals: req.user?.id
        }
      }
    },
    update: ({ req, id }) => req.user?.role === 'owner' || req.user?.id === id
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nombre',
      required: true
    },
    {
      name: 'role',
      type: 'select',
      label: 'Rol',
      defaultValue: 'editor',
      required: true,
      options: [
        { label: 'Propietario', value: 'owner' },
        { label: 'Editor', value: 'editor' }
      ]
    }
  ]
}
