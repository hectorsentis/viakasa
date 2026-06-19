import nextVitals from 'eslint-config-next/core-web-vitals'

const config = [
  ...nextVitals,
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'docs/design-system/**',
      'app/(payload)/admin/importMap.js',
      'payload-types.ts'
    ]
  }
]

export default config
