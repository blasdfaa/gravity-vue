import { addComponent, createResolver, defineNuxtModule, resolvePath } from '@nuxt/kit'

import { join } from 'node:path'
import { readFileSync, readdirSync } from 'node:fs'
import { parseSync } from '@oxc-parser/wasm'

export default defineNuxtModule({
  meta: {
    name: 'gravity-ui',
    configKey: 'gravity-ui',
  },
  async setup() {
    const { resolve } = createResolver(__dirname)

    const COMPONENT_DIR_PATH = resolve('../../gravity-vue/src/components')

    // Получение списка всех компонентов в директории
    const components = readdirSync(COMPONENT_DIR_PATH).filter(component => !component.includes('.ts'))

    try {
      components
        .forEach(async (dir) => {
          try {
            const filePath = await resolvePath(join(COMPONENT_DIR_PATH, dir, 'index'), { extensions: ['.ts', '.js'] })
            const content = readFileSync(filePath, { encoding: 'utf8' })
            const ast = parseSync(content, {
              sourceType: 'module',
              sourceFilename: filePath,
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
                filePath: resolve(filePath),
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
