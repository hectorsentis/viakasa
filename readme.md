# Viakasa

Sitio web de producción para Viakasa, asesoría inmobiliaria en Madrid, Tenerife y toda España. Incluye frontend público en español, Payload CMS para administración, gestión de propiedades, solicitudes de contacto y configuración lista para desplegar en Vercel.

## Desarrollo

1. Instala dependencias:

```bash
npm install
```

2. Copia variables de entorno:

```bash
cp .env.example .env.local
```

3. Configura `DATABASE_URL`, `PAYLOAD_SECRET`, `INITIAL_ADMIN_EMAIL` e `INITIAL_ADMIN_PASSWORD`.

4. Crea datos iniciales:

```bash
npm run seed
```

5. Arranca el proyecto:

```bash
npm run dev
```

El sitio público estará en `/` y la administración en `/admin`.

## Despliegue en Vercel

- Conecta el repositorio a Vercel.
- Usa PostgreSQL gestionado, por ejemplo Neon, Supabase Postgres o Vercel Postgres, y define `DATABASE_URL`.
- Define un `PAYLOAD_SECRET` largo y único.
- Configura Cloudinary con `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` y `CLOUDINARY_FOLDER`.
- Elige email más adelante:
  - SMTP para IONOS o Gmail: `EMAIL_PROVIDER=smtp`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_SECURE`.
  - Resend: `EMAIL_PROVIDER=resend`, `RESEND_API_KEY`.
- Define `CONTACT_TO_EMAIL` para recibir avisos de solicitudes.
- Ejecuta `npm run seed` una vez contra producción para crear el propietario inicial.

## Contenido

Payload permite editar propiedades, servicios, páginas, ajustes del sitio y solicitudes recibidas. La creación de usuarios es invite-only: solo un usuario con rol `owner` puede crear otros usuarios. Los editores pueden gestionar contenido y propiedades.

El material original del sistema de diseño está archivado en `docs/design-system`.
