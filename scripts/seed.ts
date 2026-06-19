import nextEnv from '@next/env'
import { getPayload } from 'payload'

import { fallbackProperties, fallbackServices, fallbackSettings } from '../src/data/fallback'
import { slugify } from '../src/utils/slugify'

const { loadEnvConfig } = nextEnv
loadEnvConfig(process.cwd())

async function main() {
  const { default: configPromise } = await import('@payload-config')
  const payload = await getPayload({ config: configPromise })
  const email = process.env.INITIAL_ADMIN_EMAIL
  const password = process.env.INITIAL_ADMIN_PASSWORD
  const name = process.env.INITIAL_ADMIN_NAME || 'Equipo Viakasa'

  if (!email || !password) {
    throw new Error('Define INITIAL_ADMIN_EMAIL e INITIAL_ADMIN_PASSWORD antes de ejecutar la semilla.')
  }

  const existingUsers = await payload.find({ collection: 'users', where: { email: { equals: email } }, limit: 1 })
  if (!existingUsers.docs.length) {
    await payload.create({
      collection: 'users',
      data: { email, password, name, role: 'owner' },
      overrideAccess: true
    })
    payload.logger.info(`Usuario propietario creado: ${email}`)
  }

  const settings = await payload.find({ collection: 'site-settings', limit: 1 })
  if (!settings.docs.length) {
    await payload.create({ collection: 'site-settings', data: fallbackSettings, overrideAccess: true })
  }

  for (const [order, service] of fallbackServices.entries()) {
    const existing = await payload.find({ collection: 'services', where: { title: { equals: service.title } }, limit: 1 })
    if (!existing.docs.length) {
      await payload.create({ collection: 'services', data: { ...service, order }, overrideAccess: true })
    }
  }

  for (const property of fallbackProperties) {
    const existing = await payload.find({ collection: 'properties', where: { slug: { equals: property.slug } }, limit: 1 })
    if (existing.docs.length) continue

    await payload.create({
      collection: 'properties',
      data: {
        status: 'published',
        featured: property.featured,
        title: property.title,
        slug: property.slug || slugify(property.title),
        location: property.location,
        city: property.city as 'Madrid' | 'Tenerife' | 'Otra',
        price: property.price,
        priceNote: property.priceNote,
        operation: property.operation as 'sale' | 'rent' | 'sold',
        propertyType: property.propertyType,
        rooms: property.rooms,
        bathrooms: property.bathrooms,
        area: property.area,
        year: property.year,
        description: property.description,
        features: property.features,
        externalImageUrl: property.mainImageUrl,
        gallery: [],
        seo: {
          title: property.title,
          description: property.description
        }
      },
      overrideAccess: true
    })
  }

  payload.logger.info('Semilla completada.')
  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
