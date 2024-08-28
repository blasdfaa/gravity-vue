<script lang="ts">
export interface OverlayProps {
  background?: 'base' | 'float'
  visible?: boolean
}
</script>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { useBlock } from '../../composables'
import { hasSlotContent } from '../../utils/has-slot-content'

withDefaults(defineProps<OverlayProps>(), {
  background: 'base',
  visible: false,
})

const { b } = useBlock('overlay')

const slots = useSlots()

const hasSlot = computed(() => hasSlotContent(slots.default))
</script>

<template>
  <div :class="b({ visible })">
    <div :class="b('background', { style: background })" />
    <div v-if="hasSlot" :class="b('children')">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
@use '../../styles/variables';

$block: '.#{variables.$ns}overlay';

#{$block} {
  position: absolute;
  inset: 0;

  display: flex;
  visibility: hidden;
  justify-content: center;
  align-items: center;

  isolation: isolate;

  opacity: 0;

  transition:
    visibility 0.1s,
    opacity 0.1s linear;

  &_visible {
    visibility: visible;
    opacity: 1;
  }

  &__background {
    position: absolute;
    z-index: 0;
    inset: 0;
    opacity: 0.8;

    &_style {
      &_base {
        background-color: var(--g-color-base-background);
      }

      &_float {
        background-color: var(--g-color-base-float);
      }
    }
  }

  &__children {
    z-index: 1;
  }
}
</style>
