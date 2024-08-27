<script lang="ts">
import type { QAProps } from '../../types'
import type { SpinSize } from './types'
import { useBlock } from '../../composables'

export interface SpinProps extends QAProps {
  size: SpinSize
}
</script>

<script setup lang="ts">
withDefaults(defineProps<SpinProps>(), {
  size: 'm',
})

const { b } = useBlock('spin')
</script>

<template>
  <div :class="b({ size })" :data-qa="qa">
    <div :class="b('inner')" />
  </div>
</template>

<style lang="scss">
@use '../../styles/variables';

$block: '.#{variables.$ns}spin';

#{$block} {
  display: inline-block;
  backface-visibility: hidden;
  animation: #{variables.$ns}spin 1s linear infinite;

  &__inner {
    box-sizing: border-box;
    height: 100%;
    width: 50%;
    margin-inline-start: 50%;
    border: 2px solid var(--g-color-line-brand);
    border-inline-start: none;
    border-start-end-radius: 25px;
    border-end-end-radius: 25px;
  }

  &_size {
    &_xs {
      width: 16px;
      height: 16px;
    }

    &_s {
      width: 24px;
      height: 24px;
    }

    &_m {
      width: 28px;
      height: 28px;
    }

    &_l {
      width: 32px;
      height: 32px;
    }

    &_xl {
      width: 36px;
      height: 36px;
    }
  }
}

@keyframes #{variables.$ns}spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
