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

4. Aplica el esquema de base de datos:

```bash
npm run migrate up
```

5. Crea datos iniciales:

```bash
npm run seed
```

6. Arranca el proyecto:

```bash
npm run dev
```

El sitio público estará en `/` y la administración en `/admin`.

## Despliegue en Vercel

- Conecta el repositorio a Vercel.
- Usa Supabase Postgres o Vercel Postgres. La app leerá `DATABASE_URL` primero y, si no existe, `POSTGRES_URL_NON_POOLING`, `POSTGRES_URL` o `POSTGRES_PRISMA_URL`. Para Supabase local/Vercel, deja `POSTGRES_SSL_REJECT_UNAUTHORIZED=false`.
- Define un `PAYLOAD_SECRET` largo y único.
- Configura Vercel Blob con `BLOB_READ_WRITE_TOKEN`. Si conectas Blob desde Vercel, esta variable se añadirá automáticamente al proyecto.
- Elige email más adelante:
  - SMTP para IONOS o Gmail: `EMAIL_PROVIDER=smtp`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_SECURE`.
  - Resend: `EMAIL_PROVIDER=resend`, `RESEND_API_KEY`.
- Define `CONTACT_TO_EMAIL` para recibir avisos de solicitudes.
- Ejecuta `npm run seed` una vez contra producción para crear el propietario inicial.

## Migraciones

El esquema vive en `src/migrations`. `npm run build` ejecuta `npm run migrate up` antes de compilar, así que cada despliegue aplica las migraciones pendientes.

```bash
npm run migrate create <nombre>   # genera una migración tras cambiar colecciones
npm run migrate up                # aplica las pendientes
npm run migrate status            # lista el estado
```

Usa `npm run migrate` en lugar del binario `payload`: en Windows su cargador de tsx no resuelve los builtins `node:*` y `payload migrate:create` falla.

## Contenido

Payload permite editar propiedades, servicios, páginas, ajustes del sitio y solicitudes recibidas. La creación de usuarios es invite-only: solo un usuario con rol `owner` puede crear otros usuarios. Los editores pueden gestionar contenido y propiedades.

El material original del sistema de diseño está archivado en `docs/design-system`.

## Almacenamiento

Las imágenes subidas desde Payload se publican en Vercel Blob cuando `BLOB_READ_WRITE_TOKEN` está configurado. Payload conserva también el archivo local en desarrollo para que la administración siga siendo cómoda mientras se trabaja sin servicios externos.
