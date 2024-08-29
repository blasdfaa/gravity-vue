import type { DefineComponent, SVGAttributes } from 'vue'

export interface SVGIconSpriteData {
  id: string
  url: string
  viewBox: string
}

export type SVGIconComponentData = DefineComponent<SVGAttributes>

export type SVGIconStringData = string

export interface SVGIconSvgrData extends DefineComponent<SVGAttributes> { }

export type SVGIconData =
  | SVGIconComponentData
  | SVGIconSpriteData
  | SVGIconSvgrData
  | SVGIconStringData
