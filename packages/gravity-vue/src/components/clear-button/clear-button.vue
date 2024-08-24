<script lang="ts">
import { useBlock } from '../../composables'

export type ClearButtonProps = {
  size: ButtonSize
}
</script>

<script setup lang="ts">
import { Button, type ButtonSize } from '../button'

defineProps<ClearButtonProps>()

const { b } = useBlock('clear-button')
</script>

<template>
  <Button
    :size="size"
    :class="b()"
  />
</template>
