import type { Ref } from 'vue'
import type { RealTheme, Theme } from './types'
import { createContext } from '../../utils/create-context'

interface ThemeProviderContextValue {
  theme?: Ref<Theme>
  direction?: Ref<Theme>
  systemLightTheme?: Ref<RealTheme>
  systemDarkTheme?: Ref<RealTheme>
  rootClassName?: Ref<string>
}

export const [
  injectThemeProviderContext,
  provideThemeProviderContext,
] = createContext<ThemeProviderContextValue>('ThemeProvider')
