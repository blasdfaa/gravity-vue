import type {
  IconData,
  SVGDementions,
  SVGIconComponentData,
  SVGIconSpriteData,
  SVGIconStringData,
} from './types'

export function isSpriteData(data: IconData): data is SVGIconSpriteData {
  return typeof data === 'object'
}

export function isComponentSvgData(data: IconData): data is SVGIconComponentData {
  return (typeof data === 'object' || typeof data === 'function')
}

export function isStringSvgData(data: IconData): data is SVGIconStringData {
  return typeof data === 'string'
}
export function prepareStringData(data: SVGIconStringData) {
  return data.replace(/<svg[^>]*>/, (match) => {
    return match
      .replace(/(width|height)=(["']?)\d+\2/g, '')
      .replace(/(\s){2,}\b/g, '$1')
      .replace(/(\s)+>/g, '>')
  })
}

export function getStringViewBox(data: SVGIconStringData) {
  const match = data.match(/viewBox=(["']?)([\d\s,-]+)\1/)

  return match ? match[2] : undefined
}

export function getDementions({ width, height, size, data }: SVGDementions & { data: IconData }) {
  let w = size || width
  let h = size || height

  let viewBox: string | undefined

  if (isSpriteData(data)) {
    viewBox = data.viewBox
  }

  else if (isComponentSvgData(data)) {
    w = w || '1em'
    h = h || '1em'
  }

  else if (isStringSvgData(data)) {
    viewBox = getStringViewBox(data)
  }

  if (viewBox && (!w || !h)) {
    const values = viewBox.split(/\s+|\s*,\s*/)
    if (!w) w = values[2]
    if (!h) h = values[3]
  }

  return { width: w, height: h }
}
