<script lang="ts">
import type { QAProps } from '../../types'
import type { Component, VNode } from 'vue'
import { computed, ref } from 'vue'
import { block } from '../../utils/cn'
import type { SVGIconSpriteData } from './types'

export type IconData = string | Component | ((ctx: any, cache: any) => VNode)

export interface IconProps extends QAProps {
  data: IconData
  width?: number | string
  height?: number | string
  size?: number | string
  fill?: string
  stroke?: string
  class?: string
}
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<IconProps>(), {
  fill: 'currentColor',
  stroke: 'none',
})

const b = block('icon')

const iconPrefix = ref('')

const isString = (data: IconData): data is string => typeof data === 'string'
const isComponent = (data: IconData): data is Component => typeof data === 'object' && !('id' in data)
const isFunction = (data: IconData): data is (ctx: any, cache: any) => VNode => typeof data === 'function'
function isSpriteData(data: IconData): data is SVGIconSpriteData {
  return typeof data === 'object' && 'id' in data && 'viewBox' in data
}

const dimensions = computed(() => {
  let w = props.size || props.width
  let h = props.size || props.height

  let viewBox: string | undefined

  if (isSpriteData(props.data)) {
    viewBox = props.data.viewBox
  }
  else if (isComponent(props.data) || isFunction(props.data)) {
    w = w || '1em'
    h = h || '1em'
  }
  else if (isString(props.data)) {
    const match = props.data.match(/viewBox="([^"]*)"/)
    viewBox = match ? match[1] : undefined
  }

  if (viewBox && (!w || !h)) {
    const values = viewBox.split(/\s+|\s*,\s*/)
    if (!w) w = values[2]
    if (!h) h = values[3]
  }

  return { width: w, height: h }
})

const svgProps = computed(() => ({
  'xmlns': 'http://www.w3.org/2000/svg',
  'xmlns:xlink': 'http://www.w3.org/1999/xlink',
  'width': dimensions.value.width,
  'height': dimensions.value.height,
  'class': b(null, props.class),
  'fill': props.fill,
  'stroke': props.stroke,
  'data-qa': props.qa,
}))

const href = computed(() => {
  if (isSpriteData(props.data)) {
    return iconPrefix.value + (props.data.url || `#${props.data.id}`)
  }
  return ''
})

defineExpose({
  setIconPrefix: (prefix: string) => {
    iconPrefix.value = prefix
  },
})
</script>

<template>
  <svg v-if="isString(data)" v-bind="svgProps" v-html="data" />
  <svg v-else-if="isSpriteData(data)" v-bind="svgProps">
    <use :href="href" :xlink:href="href" />
  </svg>
  <component :is="data" v-else-if="isComponent(data)" v-bind="svgProps" />
  <component :is="data" v-else-if="isFunction(data)" v-bind="svgProps" />
</template>

<style lang="scss">
@use '../../styles/variables';

$block: '.#{variables.$ns}icon';

#{$block} {
  color: inherit;
  line-height: 0;
  vertical-align: top;
}
</style>
