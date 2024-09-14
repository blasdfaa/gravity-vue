<script lang="ts">
import type { QAProps } from '../../types'
import type { AvatarSize } from '../avatar'

export interface UserLabelProps extends QAProps {
  /** @default 'person' */
  type?: 'person' | 'email' | 'empty'
  /** @default 'outlined' */
  view?: 'outlined' | 'clear'
  /** @default 's' */
  size?: AvatarSize
}

export type UserLabelEmits = {
  close: [e: Event]
  click: [e: Event]
}
</script>

<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue'
import { useBlock } from '../../composables'

withDefaults(defineProps<UserLabelProps>(), {
  size: 's',
  type: 'person',
  view: 'outlined',
})

defineEmits<UserLabelEmits>()

const { b } = useBlock('user-label')

const vm = getCurrentInstance()

const clickable = computed(() => !!vm?.props?.onClick)
const closable = computed(() => !!vm?.props?.onClose)
</script>

<template>
  <div :class="b({ clickable, closable })">
    <slot />
  </div>
</template>
