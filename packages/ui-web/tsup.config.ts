import { defineConfig } from 'tsup'
import { cp } from 'fs/promises'
import { resolve } from 'path'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: { resolve: ['@sicaho-collab/design-tokens'] },
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', 'react/jsx-runtime', 'tailwindcss', /^@radix-ui\//],
  noExternal: ['class-variance-authority', 'clsx', 'tailwind-merge'],
  treeshake: true,
  splitting: false,
  async onSuccess() {
    await cp(
      resolve('src/styles'),
      resolve('dist/styles'),
      { recursive: true }
    )
  },
})
