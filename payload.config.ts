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
    pool: {
      connectionString: process.env.DATABASE_URL
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
