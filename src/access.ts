import type { Access } from 'payload'

type Role = 'owner' | 'editor'

export const isLoggedIn: Access = ({ req }) => Boolean(req.user)

export const isOwner: Access = ({ req }) => req.user?.role === 'owner'

export const isOwnerOrEditor: Access = ({ req }) => {
  const role = req.user?.role as Role | undefined
  return role === 'owner' || role === 'editor'
}

export const publishedOrEditor: Access = ({ req }) => {
  if (req.user) return true
  return {
    status: {
      equals: 'published'
    }
  }
}

export const noPublicCreate: Access = ({ req }) => Boolean(req.user)
