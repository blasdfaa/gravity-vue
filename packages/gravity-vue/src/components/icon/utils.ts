import type {
  SVGDementions,
  SVGIconComponentData,
  SVGIconData,
  SVGIconSpriteData,
  SVGIconStringData,
  SVGIconSvgrData,
} from './types'

export function isSpriteData(data: SVGIconData): data is SVGIconSpriteData {
  return typeof data === 'object'
}

export function isSvgrData(data: SVGIconData): data is SVGIconSvgrData {
  return typeof data === 'function' && (!data.prototype || !data.prototype.render)
}

export function isComponentSvgData(data: SVGIconData): data is SVGIconComponentData {
  return (typeof data === 'object' || typeof data === 'function')
}

export function isStringSvgData(data: SVGIconData): data is SVGIconStringData {
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

export function getDementions({ width, height, size, data }: SVGDementions & { data: SVGIconData }) {
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
