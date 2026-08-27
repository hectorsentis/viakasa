import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { resendAdapter } from '@payloadcms/email-resend'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { Leads } from './src/collections/Leads'
import { Media } from './src/collections/Media'
import { Pages } from './src/collections/Pages'
import { Properties } from './src/collections/Properties'
import { Services } from './src/collections/Services'
import { SiteSettings } from './src/collections/SiteSettings'
import { Users } from './src/collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const emailProvider = process.env.EMAIL_PROVIDER
const fromName = process.env.EMAIL_FROM_NAME || 'Viakasa'
const fromAddress = process.env.EMAIL_FROM_ADDRESS || 'info@viakasa.es'

function resolveDatabaseUrl() {
  const candidates = [
    process.env.DATABASE_URL,
    process.env.POSTGRES_URL_NON_POOLING,
    process.env.POSTGRES_URL,
    process.env.POSTGRES_PRISMA_URL
  ]

  const selected = candidates.find((value) => {
    if (!value) return false
    if (value.includes('@host:') || value.includes('@localhost:') || value.includes('user:password')) return false
    return true
  })

  if (!selected) return undefined
  if (selected.includes('127.0.0.1') || selected.includes('localhost')) return selected
  if (process.env.POSTGRES_SSL_REJECT_UNAUTHORIZED === 'true') return selected

  try {
    const url = new URL(selected)
    // pg trata `sslmode=require` como `verify-full` desde pg-connection-string v3,
    // y el certificado de Supabase es autofirmado para el cliente.
    url.searchParams.set('sslmode', 'no-verify')
    return url.toString()
  } catch {
    // `new URL` lanza con una cadena mal formada; si esto ocurre a nivel de módulo
    // tumba cualquier ruta que importe la config con un 500 en HTML. Se devuelve
    // tal cual y que falle la conexión, que sí es un error legible.
    return selected
  }
}

function resolvePostgresSsl() {
  const databaseUrl = resolveDatabaseUrl()
  if (!databaseUrl) return undefined
  if (databaseUrl.includes('sslmode=disable')) return false
  if (databaseUrl.includes('127.0.0.1') || databaseUrl.includes('localhost')) return false

  return {
    rejectUnauthorized: process.env.POSTGRES_SSL_REJECT_UNAUTHORIZED === 'true'
  }
}

const email =
  emailProvider === 'resend' && process.env.RESEND_API_KEY
    ? resendAdapter({
        apiKey: process.env.RESEND_API_KEY,
        defaultFromAddress: fromAddress,
        defaultFromName: fromName
      })
    : emailProvider === 'smtp' && process.env.SMTP_HOST
      ? nodemailerAdapter({
          defaultFromAddress: fromAddress,
          defaultFromName: fromName,
          transportOptions: {
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT || 587),
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS
            }
          }
        })
      : undefined

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- Viakasa'
    },
    components: {
      graphics: {
        Logo: '/src/payload/Logo',
        Icon: '/src/payload/Icon'
      }
    }
  },
  collections: [Users, Media, Properties, Services, Pages, SiteSettings, Leads],
  db: postgresAdapter({
    migrationDir: path.resolve(dirname, 'src/migrations'),
    // Las migraciones son la única fuente de verdad del esquema. Con push activo,
    // `next dev` sincroniza cambios directamente contra la base —que aquí es la de
    // producción— y reinserta el marcador 'dev' en payload_migrations, lo que hace
    // que `migrate` aborte sin avisar en un build sin TTY como el de Vercel.
    // Tras tocar colecciones: `npm run migrate create <nombre>` y `npm run migrate up`.
    push: false,
    pool: {
      connectionString: resolveDatabaseUrl(),
      ssl: resolvePostgresSsl()
    }
  }),
  editor: lexicalEditor(),
  email,
  secret: process.env.PAYLOAD_SECRET || '',
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts')
  }
})
