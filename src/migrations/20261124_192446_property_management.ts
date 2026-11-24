import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Gestión integral de propiedades.
 *
 * - Separa el estado de publicación (borrador / publicado / despublicado /
 *   archivado) del estado comercial (disponible / reservado / vendido / alquilado).
 * - Las propiedades con operation = 'sold' pasan a operation = 'sale' +
 *   commercial_status = 'sold' ANTES de recrear el enum de operación.
 * - Rellena referencia interna, precio por m², fecha de publicación y orden de destacadas.
 * - Marca como demostración (is_demo) las propiedades de ejemplo de la semilla
 *   o con imágenes de Unsplash. NO cambia su estado de publicación.
 * - Elimina «toda España» del texto de pie guardado en Ajustes del sitio.
 *
 * No borra ninguna fila ni columna existente.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  CREATE TYPE "public"."enum_properties_commercial_status" AS ENUM('available', 'reserved', 'sold', 'rented');
  CREATE TYPE "public"."enum_properties_energy_status" AS ENUM('available', 'pending', 'exempt');
  CREATE TYPE "public"."enum_properties_energy_consumption_rating" AS ENUM('A', 'B', 'C', 'D', 'E', 'F', 'G');
  CREATE TYPE "public"."enum_properties_energy_emissions_rating" AS ENUM('A', 'B', 'C', 'D', 'E', 'F', 'G');
  ALTER TYPE "public"."enum_properties_status" ADD VALUE IF NOT EXISTS 'unpublished';
  ALTER TYPE "public"."enum_properties_status" ADD VALUE IF NOT EXISTS 'archived';

  ALTER TABLE "properties" ADD COLUMN "commercial_status" "enum_properties_commercial_status" DEFAULT 'available' NOT NULL;

  -- «Vendido» deja de ser una operación y pasa a ser un estado comercial.
  UPDATE "properties" SET "commercial_status" = 'sold', "operation" = 'sale' WHERE "operation" = 'sold';

  ALTER TABLE "properties" ALTER COLUMN "operation" SET DATA TYPE text;
  ALTER TABLE "properties" ALTER COLUMN "operation" SET DEFAULT 'sale'::text;
  DROP TYPE "public"."enum_properties_operation";
  CREATE TYPE "public"."enum_properties_operation" AS ENUM('sale', 'rent');
  ALTER TABLE "properties" ALTER COLUMN "operation" SET DEFAULT 'sale'::"public"."enum_properties_operation";
  ALTER TABLE "properties" ALTER COLUMN "operation" SET DATA TYPE "public"."enum_properties_operation" USING "operation"::"public"."enum_properties_operation";

  -- El plugin de Vercel Blob declara este campo; puede existir ya en producción.
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "prefix" varchar DEFAULT 'propiedades';

  ALTER TABLE "properties" ADD COLUMN "reference" varchar;
  ALTER TABLE "properties" ADD COLUMN "featured_order" numeric;
  ALTER TABLE "properties" ADD COLUMN "published_at" timestamp(3) with time zone;
  ALTER TABLE "properties" ADD COLUMN "is_demo" boolean;
  ALTER TABLE "properties" ADD COLUMN "internal_notes" varchar;
  ALTER TABLE "properties" ADD COLUMN "price_per_sqm" numeric;
  ALTER TABLE "properties" ADD COLUMN "address" varchar;
  ALTER TABLE "properties" ADD COLUMN "postal_code" varchar;
  ALTER TABLE "properties" ADD COLUMN "latitude" numeric;
  ALTER TABLE "properties" ADD COLUMN "longitude" numeric;
  ALTER TABLE "properties" ADD COLUMN "show_exact_location" boolean;
  ALTER TABLE "properties" ADD COLUMN "usable_area" numeric;
  ALTER TABLE "properties" ADD COLUMN "energy_status" "enum_properties_energy_status" DEFAULT 'pending';
  ALTER TABLE "properties" ADD COLUMN "energy_consumption_rating" "enum_properties_energy_consumption_rating";
  ALTER TABLE "properties" ADD COLUMN "energy_consumption" numeric;
  ALTER TABLE "properties" ADD COLUMN "energy_emissions_rating" "enum_properties_energy_emissions_rating";
  ALTER TABLE "properties" ADD COLUMN "energy_emissions" numeric;
  ALTER TABLE "properties" ADD COLUMN "seo_no_index" boolean;

  -- Relleno de datos derivados en las filas existentes.
  UPDATE "properties" SET "reference" = 'VK-' || lpad("id"::text, 4, '0') WHERE "reference" IS NULL;
  UPDATE "properties" SET "price_per_sqm" = round("price" / "area") WHERE "price" > 0 AND "area" > 0;
  UPDATE "properties" SET "published_at" = COALESCE("updated_at", "created_at") WHERE "status" = 'published' AND "published_at" IS NULL;
  UPDATE "properties" SET "is_demo" = true
    WHERE "external_image_url" ILIKE '%unsplash.com%'
       OR "slug" IN ('piso-reformado-con-terraza', 'villa-con-vistas-al-oceano', 'atico-duplex-con-azotea-privada');
  UPDATE "properties" SET "featured_order" = sub.rn
    FROM (SELECT "id", row_number() OVER (ORDER BY "title") AS rn FROM "properties" WHERE "featured" = true) sub
    WHERE "properties"."id" = sub."id";

  -- Ámbito geográfico: Madrid · Tenerife.
  UPDATE "site_settings" SET "footer_text" = replace(replace("footer_text", 'Madrid, Tenerife y toda España', 'Madrid y Tenerife'), ' y toda España', '')
    WHERE "footer_text" ILIKE '%toda España%';
  UPDATE "site_settings" SET "footer_text_en" = replace(replace("footer_text_en", 'Madrid, Tenerife and across Spain', 'Madrid and Tenerife'), ' and across Spain', '')
    WHERE "footer_text_en" ILIKE '%across Spain%';

  CREATE INDEX "properties_status_idx" ON "properties" USING btree ("status");
  CREATE INDEX "properties_commercial_status_idx" ON "properties" USING btree ("commercial_status");
  CREATE UNIQUE INDEX "properties_reference_idx" ON "properties" USING btree ("reference");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  DROP INDEX IF EXISTS "properties_status_idx";
  DROP INDEX IF EXISTS "properties_commercial_status_idx";
  DROP INDEX IF EXISTS "properties_reference_idx";

  -- Estados nuevos de publicación -> borrador (no visibles), como en el esquema anterior.
  ALTER TABLE "properties" ALTER COLUMN "status" SET DATA TYPE text;
  ALTER TABLE "properties" ALTER COLUMN "status" SET DEFAULT 'draft'::text;
  UPDATE "properties" SET "status" = 'draft' WHERE "status" IN ('unpublished', 'archived');
  DROP TYPE "public"."enum_properties_status";
  CREATE TYPE "public"."enum_properties_status" AS ENUM('draft', 'published');
  ALTER TABLE "properties" ALTER COLUMN "status" SET DEFAULT 'draft'::"public"."enum_properties_status";
  ALTER TABLE "properties" ALTER COLUMN "status" SET DATA TYPE "public"."enum_properties_status" USING "status"::"public"."enum_properties_status";

  -- Restaura operation = 'sold' a partir del estado comercial.
  ALTER TABLE "properties" ALTER COLUMN "operation" SET DATA TYPE text;
  ALTER TABLE "properties" ALTER COLUMN "operation" SET DEFAULT 'sale'::text;
  UPDATE "properties" SET "operation" = 'sold' WHERE "commercial_status" = 'sold';
  DROP TYPE "public"."enum_properties_operation";
  CREATE TYPE "public"."enum_properties_operation" AS ENUM('sale', 'rent', 'sold');
  ALTER TABLE "properties" ALTER COLUMN "operation" SET DEFAULT 'sale'::"public"."enum_properties_operation";
  ALTER TABLE "properties" ALTER COLUMN "operation" SET DATA TYPE "public"."enum_properties_operation" USING "operation"::"public"."enum_properties_operation";

  ALTER TABLE "properties" DROP COLUMN "commercial_status";
  ALTER TABLE "properties" DROP COLUMN "reference";
  ALTER TABLE "properties" DROP COLUMN "featured_order";
  ALTER TABLE "properties" DROP COLUMN "published_at";
  ALTER TABLE "properties" DROP COLUMN "is_demo";
  ALTER TABLE "properties" DROP COLUMN "internal_notes";
  ALTER TABLE "properties" DROP COLUMN "price_per_sqm";
  ALTER TABLE "properties" DROP COLUMN "address";
  ALTER TABLE "properties" DROP COLUMN "postal_code";
  ALTER TABLE "properties" DROP COLUMN "latitude";
  ALTER TABLE "properties" DROP COLUMN "longitude";
  ALTER TABLE "properties" DROP COLUMN "show_exact_location";
  ALTER TABLE "properties" DROP COLUMN "usable_area";
  ALTER TABLE "properties" DROP COLUMN "energy_status";
  ALTER TABLE "properties" DROP COLUMN "energy_consumption_rating";
  ALTER TABLE "properties" DROP COLUMN "energy_consumption";
  ALTER TABLE "properties" DROP COLUMN "energy_emissions_rating";
  ALTER TABLE "properties" DROP COLUMN "energy_emissions";
  ALTER TABLE "properties" DROP COLUMN "seo_no_index";
  DROP TYPE "public"."enum_properties_commercial_status";
  DROP TYPE "public"."enum_properties_energy_status";
  DROP TYPE "public"."enum_properties_energy_consumption_rating";
  DROP TYPE "public"."enum_properties_energy_emissions_rating";`)
}
