import '@payloadcms/next/css'
import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { RootLayout } from '@payloadcms/next/layouts'
import { handleServerFunctions } from '@payloadcms/next/layouts'
import type { ServerFunctionClient } from 'payload'

import { importMap } from './admin/importMap'

export const metadata: Metadata = {
  title: 'Administración · Viakasa'
}

export default function PayloadLayout({ children }: { children: React.ReactNode }) {
  async function serverFunction(args: Parameters<ServerFunctionClient>[0]) {
    'use server'
    return handleServerFunctions({
      ...args,
      config: configPromise,
      importMap
    })
  }

  return RootLayout({
    children,
    config: configPromise,
    importMap,
    serverFunction
  })
}
