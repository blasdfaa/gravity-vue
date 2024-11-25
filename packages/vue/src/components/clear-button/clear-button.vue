<script lang="ts">
import { useBlock } from '../../composables'

export type ClearButtonProps = {
  size: ButtonSize
}
</script>

<script setup lang="ts">
import { type ButtonSize, GButton } from '../button'

defineProps<ClearButtonProps>()

const { b } = useBlock('clear-button')
</script>

<template>
  <GButton
    :size="size"
    :class="b()"
  />
</template>
