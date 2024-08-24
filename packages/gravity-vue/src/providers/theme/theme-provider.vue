<script lang="ts">
import type { Direction, RealTheme, Theme } from './types'
import { block } from '../../utils/cn'

export interface ThemeProviderProps {
  theme?: Theme
  systemLightTheme?: RealTheme
  systemDarkTheme?: RealTheme
  /**
   * The global reading direction of your application.
   * @defaultValue 'ltr'
   */
  direction?: Direction
  nativeScrollbar?: boolean
  scoped?: boolean
  rootClassName?: string
}

const b = block('root')
</script>

<script setup lang="ts">
import { toRefs } from 'vue'
import { useColorMode } from '@vueuse/core'
import { provideThemeProviderContext } from './context'

const props = withDefaults(defineProps<ThemeProviderProps>(), {
  theme: 'dark',
  direction: 'ltr',
  systemDarkTheme: 'dark',
  systemLightTheme: 'light',
  rootClassName: 'root',
  nativeScrollbar: true,
  scoped: false,
})

const { direction, systemLightTheme, systemDarkTheme, rootClassName } = toRefs(props)

const theme = useColorMode({
  attribute: 'data-g-theme',
  initialValue: props.theme,
  modes: {
    'dark': 'dark',
    'light': 'light',
    'light-hc': 'light-hc',
    'dark-hc': 'dark-hc',
  },
})

provideThemeProviderContext({
  theme: theme.system,
  direction,
  systemLightTheme,
  systemDarkTheme,
  rootClassName,
})
</script>

<template>
  <div
    v-if="scoped"
    :class="b({ theme, 'native-scrollbar': nativeScrollbar !== false })"
    :dir="direction"
  >
    <slot />
  </div>
  <template v-else>
    <slot />
  </template>
</template>
