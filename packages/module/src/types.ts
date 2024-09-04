export interface ModuleOptions {
  /**
   * Include default component styles
   * @default true
   */
  css?: boolean
}

declare module '@nuxt/schema' {
  interface NuxtConfig {
    nuxtUI?: ModuleOptions
  }
  interface NuxtOptions {
    nuxtUI?: ModuleOptions
  }
}
