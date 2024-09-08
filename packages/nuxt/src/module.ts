import { addComponent, defineNuxtModule } from '@nuxt/kit'
import { components } from 'gravity-vue'
import type { ModuleOptions } from './types'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'gravity-ui',
    configKey: 'gravity',
  },
  defaults: {
    css: true,
  },
  async setup(options, nuxt) {
    if (options.css) {
      nuxt.options.css.push('gravity-vue/styles.css')
    }

    nuxt.options.vite.optimizeDeps = nuxt.options.vite.optimizeDeps || {}
    nuxt.options.vite.optimizeDeps.include = nuxt.options.vite.optimizeDeps.include || []
    nuxt.options.vite.optimizeDeps.include.push('gravity-vue')

    Object.keys(components).forEach((name) => {
      addComponent({
        name,
        export: name,
        filePath: 'gravity-vue',
      })
    })

    addComponent({
      name: 'ThemeProvider',
      export: 'ThemeProvider',
      filePath: 'gravity-vue',
    })
  },
})
