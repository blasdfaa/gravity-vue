<script setup lang="ts">
import type { Story, Variant } from 'histoire'
import { GThemeProvider } from '../providers/theme'

defineProps<{
  story: Story
  variant?: Variant
}>()
</script>

<template>
  <GThemeProvider theme="dark">
    <slot />
  </GThemeProvider>
</template>
