<script setup lang="ts">
import type { Story, Variant } from 'histoire'
import { ThemeProvider } from '../providers/theme'

defineProps<{
  story: Story
  variant?: Variant
}>()
</script>

<template>
  <ThemeProvider theme="dark">
    <slot />
  </ThemeProvider>
</template>
