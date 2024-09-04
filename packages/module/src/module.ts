import { addComponent, createResolver, defineNuxtModule, resolvePath } from '@nuxt/kit'

import { join } from 'node:path'
import { readFileSync, readdirSync } from 'node:fs'
import { parseSync } from '@oxc-parser/wasm'
import type { ModuleOptions } from './types'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'gravity-ui',
    configKey: 'gravityUI',
  },
  defaults: {
    css: true,
  },
  async setup(options, nuxt) {
    const { resolve } = createResolver(__dirname)

    const COMPONENT_DIR_PATH = resolve('../../gravity-vue/src/components')
    const PROVIDERS_DIR_PATH = resolve('../../gravity-vue/src/providers')

    // Получение списка всех компонентов в директории
    const components = readdirSync(COMPONENT_DIR_PATH).filter(component => !component.includes('.ts'))

    // После фильтрации добавляем провайдер темы
    components.push('theme')

    if (options.css) {
      nuxt.options.css.push('gravity-vue/styles.css')
    }

    try {
      components
        .forEach(async (dir) => {
          try {
            const filePath = await resolvePath(join(COMPONENT_DIR_PATH, dir, 'index'), { extensions: ['.ts', '.js'] })
            const themeProviderFilePath = await resolvePath(join(PROVIDERS_DIR_PATH, 'theme', 'index'), { extensions: ['.ts', '.js'] })
            const themeOrComponentPath = dir === 'theme' ? themeProviderFilePath : filePath

            const content = readFileSync(themeOrComponentPath, { encoding: 'utf8' })
            const ast = parseSync(content, {
              sourceType: 'module',
              sourceFilename: themeOrComponentPath,
            })

            const exportedKeys: string[] = ast.program.body
              .filter(node => node.type === 'ExportNamedDeclaration')
            // @ts-expect-error parse return any
              .flatMap(node => node.specifiers.map(specifier => specifier.exported.name))
              .filter((key: string) => /^[A-Z]/.test(key))

            exportedKeys.forEach((key) => {
              addComponent({
                name: key,
                export: key,
                filePath: resolve(themeOrComponentPath),
              })
            })
          }
          catch (err) {
            if (err instanceof Error) {
              console.warn('Module error: ', err.message)
            }
          }
        })
    }
    catch (err) {
      if (err instanceof Error) {
        console.warn(err.message)
      }
    }
  },
})
