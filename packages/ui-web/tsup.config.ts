import { defineConfig } from 'tsup'
import { cp } from 'fs/promises'
import { resolve } from 'path'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: { resolve: ['@alumable/design-tokens'] },
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', 'tailwindcss'],
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
