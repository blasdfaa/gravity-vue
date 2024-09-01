<script lang="ts">
import type { QAProps } from '../../types'
import { computed } from 'vue'
import type { SVGDementions, SVGIconData } from './types'
import { useBlock } from '../../composables'
import { getDementions, isComponentSvgData, isSpriteData, isStringSvgData, prepareStringData } from './utils'

export type IconData = SVGIconData

export interface IconProps extends QAProps, SVGDementions {
  data: SVGIconData
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

const { b } = useBlock('icon')

const dimensions = computed(() => getDementions(props))

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
    return (props.data.url || `#${props.data.id}`)
  }
  return ''
})
</script>

<template>
  <svg v-if="isStringSvgData(data)" v-bind="svgProps" v-html="prepareStringData(data)" />

  <component :is="data" v-if="isComponentSvgData(data)" v-bind="svgProps" />

  <svg v-else-if="isSpriteData(data)" v-bind="svgProps">
    <use :href="href" :xlink:href="href" />
  </svg>
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
