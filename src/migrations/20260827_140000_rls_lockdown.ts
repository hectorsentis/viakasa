import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Cierra el acceso de la Data API de Supabase a las tablas de Payload.
 *
 * Supabase expone el esquema `public` a través de PostgREST con los roles `anon`
 * y `authenticated`. Payload crea ahí sus tablas sin RLS, así que la publishable
 * key (que viaja al navegador en NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) podía leer
 * `users` —incluidas las columnas `hash` y `salt`— y `leads` con datos personales,
 * además de escribir y truncar.
 *
 * Payload conecta como `postgres`, que tiene BYPASSRLS, de modo que ni la RLS ni
 * los REVOKE afectan al CMS. Se aplican las dos capas a propósito: RLS sin
 * políticas deniega por defecto, y los REVOKE quitan el privilegio de raíz.
 */

const tables = [
  'users',
  'users_sessions',
  'media',
  'properties',
  'properties_features',
  'properties_gallery',
  'services',
  'pages',
  'site_settings',
  'site_settings_social_links',
  'leads',
  'payload_kv',
  'payload_locked_documents',
  'payload_locked_documents_rels',
  'payload_preferences',
  'payload_preferences_rels',
  'payload_migrations'
]

export async function up({ db }: MigrateUpArgs): Promise<void> {
  for (const table of tables) {
    // Sin políticas, habilitar RLS deniega todo a los roles que no la eluden.
    await db.execute(sql.raw(`ALTER TABLE "public"."${table}" ENABLE ROW LEVEL SECURITY;`))
    await db.execute(sql.raw(`REVOKE ALL ON TABLE "public"."${table}" FROM anon, authenticated;`))
  }

  // Las tablas que cree Payload en el futuro no deben heredar los grants de Supabase.
  await db.execute(
    sql.raw(`ALTER DEFAULT PRIVILEGES IN SCHEMA "public" REVOKE ALL ON TABLES FROM anon, authenticated;`)
  )
  await db.execute(
    sql.raw(`ALTER DEFAULT PRIVILEGES IN SCHEMA "public" REVOKE ALL ON SEQUENCES FROM anon, authenticated;`)
  )
  await db.execute(sql.raw(`REVOKE ALL ON ALL SEQUENCES IN SCHEMA "public" FROM anon, authenticated;`))
  await db.execute(sql.raw(`REVOKE USAGE ON SCHEMA "public" FROM anon, authenticated;`))
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql.raw(`GRANT USAGE ON SCHEMA "public" TO anon, authenticated;`))
  await db.execute(
    sql.raw(`ALTER DEFAULT PRIVILEGES IN SCHEMA "public" GRANT ALL ON TABLES TO anon, authenticated;`)
  )
  await db.execute(
    sql.raw(`ALTER DEFAULT PRIVILEGES IN SCHEMA "public" GRANT ALL ON SEQUENCES TO anon, authenticated;`)
  )
  await db.execute(sql.raw(`GRANT ALL ON ALL SEQUENCES IN SCHEMA "public" TO anon, authenticated;`))

  for (const table of tables) {
    await db.execute(sql.raw(`GRANT ALL ON TABLE "public"."${table}" TO anon, authenticated;`))
    await db.execute(sql.raw(`ALTER TABLE "public"."${table}" DISABLE ROW LEVEL SECURITY;`))
  }
}
