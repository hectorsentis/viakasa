/**
 * Runner de migraciones de Payload.
 *
 * El binario `payload` transpila con `tsImport` de tsx y en Windows falla al
 * resolver los builtins `node:*` ("ENOENT ... node:crypto?tsx-namespace=..."),
 * asi que invocamos el adaptador de base de datos directamente con el CLI de tsx.
 *
 * Uso: tsx scripts/migrate.ts <create|up|status|down|fresh> [nombre]
 */
import nextEnv from '@next/env'
import payload from 'payload'

const { loadEnvConfig } = nextEnv
loadEnvConfig(process.cwd())

const command = process.argv[2] || 'up'
const migrationName = process.argv[3]

/**
 * Payload marca la base con una fila 'dev' (batch -1) cada vez que sincroniza el
 * esquema en desarrollo. Si esa fila existe, `migrate` abre un prompt interactivo
 * avisando de posible pérdida de datos y, sin TTY —el build de Vercel—, `prompts`
 * cancela y hace exit(0): el despliegue termina "correctamente" sin aplicar NADA.
 *
 * El adaptador está configurado con `push: false`, así que la fila ya no debería
 * aparecer. Si aparece, avisamos de forma visible y la retiramos para que las
 * migraciones se apliquen en lugar de saltarse en silencio.
 */
async function clearDevMarker() {
  const existing = await payload.find({
    collection: 'payload-migrations',
    limit: 0,
    where: { batch: { equals: -1 } }
  })

  if (!existing.docs.length) return

  payload.logger.warn(
    'Se encontró el marcador de push de desarrollo en payload_migrations. ' +
      'El esquema pudo sincronizarse fuera de las migraciones: revisa que no haya divergencias. ' +
      'Se elimina el marcador para poder aplicar las migraciones pendientes.'
  )

  for (const doc of existing.docs) {
    await payload.delete({ collection: 'payload-migrations', id: doc.id })
  }
}

async function main() {
  const { default: config } = await import('@payload-config')

  process.env.PAYLOAD_MIGRATING = 'true'

  await payload.init({
    config,
    // `create` sólo lee el esquema en memoria: no necesita conexión.
    disableDBConnect: command === 'create',
    disableOnInit: true
  })

  const adapter = payload.db
  if (!adapter) throw new Error('No se encontró el adaptador de base de datos')

  switch (command) {
    case 'create':
      await adapter.createMigration({ forceAcceptWarning: true, migrationName, payload })
      break
    case 'up':
      await clearDevMarker()
      await adapter.migrate()
      break
    case 'status':
      await adapter.migrateStatus()
      break
    case 'down':
      await adapter.migrateDown()
      break
    case 'fresh':
      await adapter.migrateFresh({ forceAcceptWarning: true })
      break
    default:
      throw new Error(`Comando desconocido: ${command}. Usa create, up, status, down o fresh.`)
  }

  payload.logger.info('Listo.')
  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
