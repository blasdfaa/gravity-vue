import type { Component, VNode } from 'vue'

export interface SVGIconSpriteData {
  id: string
  url: string
  viewBox: string
}

export type SVGIconComponentData = Component | VNode

export type SVGIconStringData = string

export type IconData =
  | SVGIconComponentData
  | SVGIconSpriteData
  | SVGIconStringData

export interface SVGDementions {
  width?: number | string
  height?: number | string
  size?: number | string
}
