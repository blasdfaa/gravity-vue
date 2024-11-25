/// <reference types="vitest" />

import path from 'node:path'
import fs from 'node:fs'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import Vue from '@vitejs/plugin-vue'
import pkg from './package.json' assert { type: 'json' }
import { globbySync } from 'globby'

export default defineConfig({
  plugins: [
    dts({
      entryRoot: 'src',
      staticImport: true,
      afterBuild: () => {
        globbySync(['dist/**/*.d.ts', 'dist/**.d.ts']).forEach((file) => {
          fs.copyFileSync(file, file.replace(/\.d\.ts$/, '.d.cts'))
        })
      },
    }),
    Vue(),
  ],
  build: {
    target: 'esnext',
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      fileName: format => (format === 'es' ? 'index.js' : 'index.cjs'),
    },
    rollupOptions: {
      output: [
        {
          format: 'cjs',
          preserveModules: true,
          preserveModulesRoot: 'src',
          exports: 'named',
          entryFileNames: '[name].cjs',
        },
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
