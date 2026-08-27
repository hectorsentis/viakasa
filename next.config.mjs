import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' },
      { protocol: 'https', hostname: '**.public.blob.vercel-storage.com' }
    ]
  },
  typedRoutes: false,
  // sharp es un binario nativo: hay que dejarlo fuera del bundle para que se
  // resuelva desde node_modules en tiempo de ejecución.
  serverExternalPackages: ['sharp'],
  // El rastreo de dependencias sigue los `import`, pero no ve que sharp abra
  // libvips por dlopen. Sin esto, la función serverless de Vercel se despliega
  // sin libvips-cpp.so y `import sharp` lanza ERR_DLOPEN_FAILED al cargar
  // payload.config.ts, tumbando toda ruta dinámica que la importe.
  outputFileTracingIncludes: {
    '/**': ['./node_modules/@img/**']
  }
}

export default withPayload(nextConfig)
