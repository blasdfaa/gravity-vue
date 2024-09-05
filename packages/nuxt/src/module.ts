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
  // eslint-disable-next-line unused-imports/no-unused-vars
  async setup(options, nuxt) {
    Object.keys(components).forEach((name) => {
      addComponent({
        name,
        export: name,
        filePath: 'gravity-vue',
      })
    })

    // Рабочий вариант
    // const componentNames = Object.keys(components)

    // componentNames.push('ThemeProvider')

    // if (options.css) {
    //   nuxt.options.css.push('gravity-vue/styles.css')
    // }

    // const gravityVuePath = dirname(require.resolve('gravity-vue/package.json'))

    // try {
    //   componentNames.forEach((name) => {
    //     const nameAsKebabCase = kebabCase(name)
    //     const componentPath = name === 'ThemeProvider'
    //       ? join(gravityVuePath, 'src', 'providers', 'theme')
    //       : join(gravityVuePath, 'src', 'components', nameAsKebabCase)

    //     addComponent({
    //       name,
    //       export: name,
    //       filePath: componentPath,
    //     })
    //   })
    // }
    // catch (err) {
    //   if (err instanceof Error) {
    //     console.warn(`Error adding component: ${err.message}`)
    //   }
    // }
  },
})
