import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media" ADD COLUMN "alt_en" varchar;
  ALTER TABLE "properties_features" ADD COLUMN "label_en" varchar;
  ALTER TABLE "properties" ADD COLUMN "title_en" varchar;
  ALTER TABLE "properties" ADD COLUMN "location_en" varchar;
  ALTER TABLE "properties" ADD COLUMN "price_note_en" varchar;
  ALTER TABLE "properties" ADD COLUMN "property_type_en" varchar;
  ALTER TABLE "properties" ADD COLUMN "description_en" varchar;
  ALTER TABLE "properties" ADD COLUMN "seo_title_en" varchar;
  ALTER TABLE "properties" ADD COLUMN "seo_description_en" varchar;
  ALTER TABLE "services" ADD COLUMN "title_en" varchar;
  ALTER TABLE "services" ADD COLUMN "description_en" varchar;
  ALTER TABLE "pages" ADD COLUMN "title_en" varchar;
  ALTER TABLE "pages" ADD COLUMN "summary_en" varchar;
  ALTER TABLE "pages" ADD COLUMN "content_en" jsonb;
  ALTER TABLE "site_settings" ADD COLUMN "tagline_en" varchar DEFAULT 'The direct route to your home';
  ALTER TABLE "site_settings" ADD COLUMN "hero_title_en" varchar DEFAULT 'The direct route to your home';
  ALTER TABLE "site_settings" ADD COLUMN "hero_text_en" varchar DEFAULT 'Complete property advisory for buying, selling, legal services and finance, with one trusted point of contact.';
  ALTER TABLE "site_settings" ADD COLUMN "offices_en" varchar DEFAULT 'Madrid · Santa Cruz de Tenerife';
  ALTER TABLE "site_settings" ADD COLUMN "footer_text_en" varchar DEFAULT 'Your trusted property advisers.';
  ALTER TABLE "site_settings" ADD COLUMN "primary_cta_en" varchar DEFAULT 'View properties';
  ALTER TABLE "site_settings" ADD COLUMN "secondary_cta_en" varchar DEFAULT 'Free valuation';

  UPDATE "services" SET "title_en" = 'Buying and selling', "description_en" = 'Realistic valuations, firm negotiation and a smooth completion. You decide; we make it happen.' WHERE "title" = 'Compra y venta';
  UPDATE "services" SET "title_en" = 'Legal advice', "description_en" = 'Contract review, notary, land registry and due diligence with in-house legal support.' WHERE "title" = 'Asesoría legal';
  UPDATE "services" SET "title_en" = 'Finance', "description_en" = 'Mortgage assessment and access to terms suited to your circumstances.' WHERE "title" = 'Financiación';
  UPDATE "services" SET "title_en" = 'Full management', "description_en" = 'Letting, administration and property preparation, handled from start to finish.' WHERE "title" = 'Gestión integral';

  UPDATE "properties" SET "title_en" = 'Renovated apartment with terrace', "location_en" = 'Salamanca district · Madrid', "property_type_en" = 'Apartment', "description_en" = 'Fully renovated exterior apartment in one of Madrid’s most exclusive areas, with a bright living room opening onto a terrace, eat-in kitchen and three bedrooms.' WHERE "slug" = 'piso-reformado-con-terraza';
  UPDATE "properties" SET "title_en" = 'Villa with ocean views', "location_en" = 'Costa Adeje · Tenerife', "property_type_en" = 'Villa', "description_en" = 'Recently built villa with an infinity pool and uninterrupted Atlantic views, high-end finishes, smart-home technology and generous outdoor spaces.' WHERE "slug" = 'villa-con-vistas-al-oceano';
  UPDATE "properties" SET "title_en" = 'Duplex penthouse with private roof terrace', "location_en" = 'Chamberí · Madrid', "property_type_en" = 'Penthouse', "description_en" = 'Upper-floor duplex with a 40 m² private roof terrace, open-plan layout, abundant natural light and quality materials.' WHERE "slug" = 'atico-duplex-con-azotea-privada';

  UPDATE "properties_features" SET "label_en" = CASE "label"
    WHEN 'Aire acondicionado' THEN 'Air conditioning' WHEN 'Ascensor' THEN 'Lift' WHEN 'Terraza' THEN 'Terrace'
    WHEN 'Piscina' THEN 'Swimming pool' WHEN 'Vistas al mar' THEN 'Ocean views' WHEN 'Garaje' THEN 'Garage'
    WHEN 'Azotea privada' THEN 'Private roof terrace' WHEN 'Exterior' THEN 'Exterior-facing' WHEN 'Cocina equipada' THEN 'Fitted kitchen'
    ELSE "label_en" END;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media" DROP COLUMN "alt_en";
  ALTER TABLE "properties_features" DROP COLUMN "label_en";
  ALTER TABLE "properties" DROP COLUMN "title_en";
  ALTER TABLE "properties" DROP COLUMN "location_en";
  ALTER TABLE "properties" DROP COLUMN "price_note_en";
  ALTER TABLE "properties" DROP COLUMN "property_type_en";
  ALTER TABLE "properties" DROP COLUMN "description_en";
  ALTER TABLE "properties" DROP COLUMN "seo_title_en";
  ALTER TABLE "properties" DROP COLUMN "seo_description_en";
  ALTER TABLE "services" DROP COLUMN "title_en";
  ALTER TABLE "services" DROP COLUMN "description_en";
  ALTER TABLE "pages" DROP COLUMN "title_en";
  ALTER TABLE "pages" DROP COLUMN "summary_en";
  ALTER TABLE "pages" DROP COLUMN "content_en";
  ALTER TABLE "site_settings" DROP COLUMN "tagline_en";
  ALTER TABLE "site_settings" DROP COLUMN "hero_title_en";
  ALTER TABLE "site_settings" DROP COLUMN "hero_text_en";
  ALTER TABLE "site_settings" DROP COLUMN "offices_en";
  ALTER TABLE "site_settings" DROP COLUMN "footer_text_en";
  ALTER TABLE "site_settings" DROP COLUMN "primary_cta_en";
  ALTER TABLE "site_settings" DROP COLUMN "secondary_cta_en";`)
}
