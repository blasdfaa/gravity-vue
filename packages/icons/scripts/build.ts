import fs from 'node:fs'
import path from 'node:path'

const INPUT_DIR = './svgs'
const OUTPUT_DIR = './dist'

function cleanDirectory(directory: string) {
  if (fs.existsSync(directory)) {
    fs.readdirSync(directory).forEach((file) => {
      const filePath = path.join(directory, file)
      fs.unlinkSync(filePath)
    })

    fs.rmdirSync(directory)
  }
}

function createOutputDirectory() {
  cleanDirectory(OUTPUT_DIR)
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
}

function getComponentName(fileName: string) {
  return fileName
    .replace(/\.svg$/, '')
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

function processSvgContent(content: string) {
  return content
    .replace(/\n/g, ' ')
    .replace(/<!--.*?-->/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/width="[^"]*"/, 'width="1em"')
    .replace(/height="[^"]*"/, 'height="1em"')
    .replace(/fill="([^"]+)"/g, ':fill="color"')
    .replace(/stroke="([^"]+)"/g, ':stroke="color"')
}

function generateVueComponent(name: string, svgContent: string) {
  return `<template>
  ${svgContent}
</template>

<script>
export default {
  name: '${name}',
  props: {
    color: {
      type: String,
      default: 'currentColor'
    }
  }
}
</script>`
}

function generateIndexFile(componentNames: string[]) {
  const imports = componentNames
    .map(name => `export { default as ${name} } from './${name}.vue';`)
    .join('\n')

  return `${imports}\n`
}

function convertSvgToVueComponents() {
  if (!fs.existsSync(INPUT_DIR)) {
    throw new Error(`Input directory ${INPUT_DIR} does not exist`)
  }

  createOutputDirectory()

  const files = fs.readdirSync(INPUT_DIR)
  const componentNames: string[] = []

  files.forEach((file) => {
    if (!file.endsWith('.svg')) return

    const filePath = path.join(INPUT_DIR, file)
    const componentName = getComponentName(file)
    componentNames.push(componentName)
    const outputPath = path.join(OUTPUT_DIR, `${componentName}.vue`)

    let svgContent = fs.readFileSync(filePath, 'utf8')
    svgContent = processSvgContent(svgContent)

    const vueComponent = generateVueComponent(componentName, svgContent)

    fs.writeFileSync(outputPath, vueComponent)
  })

  const indexContent = generateIndexFile(componentNames)
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.js'), indexContent)
}

try {
  convertSvgToVueComponents()
}
catch (error) {
  console.error('Error during conversion:', error)
}
