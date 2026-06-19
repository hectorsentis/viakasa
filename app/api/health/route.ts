import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const dynamic = 'force-dynamic'

function usableDatabaseSource() {
  const candidates = [
    ['DATABASE_URL', process.env.DATABASE_URL],
    ['POSTGRES_URL_NON_POOLING', process.env.POSTGRES_URL_NON_POOLING],
    ['POSTGRES_URL', process.env.POSTGRES_URL],
    ['POSTGRES_PRISMA_URL', process.env.POSTGRES_PRISMA_URL]
  ] as const

  const selected = candidates.find(([, value]) => {
    if (!value) return false
    if (value.includes('@host:') || value.includes('@localhost:') || value.includes('user:password')) return false
    return true
  })

  return selected?.[0] || null
}

export async function GET() {
  const checks: Record<string, unknown> = {
    ok: false,
    app: 'viakasa',
    env: {
      nodeEnv: process.env.NODE_ENV,
      siteUrlPresent: Boolean(process.env.NEXT_PUBLIC_SITE_URL),
      payloadSecretPresent: Boolean(process.env.PAYLOAD_SECRET),
      databaseSource: usableDatabaseSource(),
      blobTokenPresent: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      emailProvider: process.env.EMAIL_PROVIDER || null,
      resendConfigured: Boolean(process.env.RESEND_API_KEY),
      smtpConfigured: Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS),
      contactRecipientPresent: Boolean(process.env.CONTACT_TO_EMAIL)
    }
  }

  try {
    const payload = await getPayload({ config: configPromise })
    const users = await payload.count({ collection: 'users' })
    checks.ok = true
    checks.payload = {
      initialized: true,
      users: users.totalDocs
    }
    return Response.json(checks, { status: 200 })
  } catch (error) {
    checks.payload = {
      initialized: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
    return Response.json(checks, { status: 500 })
  }
}
