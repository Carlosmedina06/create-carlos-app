import { cp } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['index.ts'],
  splitting: false,
  sourcemap: true,
  clean: true,
  shims: true,
  outDir: 'dist',
  async onSuccess() {
    await cp(
      path.join(path.dirname(fileURLToPath(import.meta.url)), 'templates'),
      path.join('dist', 'templates'),
      { recursive: true },
    )
  },
})
