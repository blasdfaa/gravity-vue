import type { Component, DefineComponent, SVGAttributes, VNode } from 'vue'

export interface SVGIconSpriteData {
  id: string
  url: string
  viewBox: string
}

export type SVGIconComponentData = Component | VNode

export type SVGIconStringData = string

export interface SVGIconSvgrData extends DefineComponent<SVGAttributes> { }

export type SVGIconData =
  | SVGIconComponentData
  | SVGIconSpriteData
  | SVGIconSvgrData
  | SVGIconStringData

export type SVGDementions = {
  width?: number | string
  height?: number | string
  size?: number | string
}
