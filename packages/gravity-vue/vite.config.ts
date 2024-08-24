/// <reference types="vitest" />

import path from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import Vue from '@vitejs/plugin-vue'
import pkg from './package.json' assert { type: 'json' }

export default defineConfig({
  plugins: [
    dts({
      entryRoot: 'src',
      staticImport: true,
    }),
    Vue(),
  ],
  build: {
    target: 'esnext',
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
    },
    rollupOptions: {
      output: [
        {
          format: 'es',
          preserveModules: true,
          preserveModulesRoot: 'src',
          exports: 'named',
          entryFileNames: '[name].js',
        },
      ],
      external: [
        ...Object.keys(pkg.dependencies ?? {}),
        ...Object.keys(pkg.peerDependencies ?? {}),
      ],
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
