<script lang="ts">
import { useBlock } from '../../composables'

export type ControlOuterContentProps = {
  noteId?: string
  errorMessageId?: string
}

export type ControlOuterContentSlots = {
  note?: () => any
  errorMessage?: () => any
}
</script>

<script setup lang="ts">
defineProps<ControlOuterContentProps>()

const slots = defineSlots<ControlOuterContentSlots>()

const { b } = useBlock('control-outer-content')
</script>

<template>
  <div :class="b()">
    <div v-if="slots?.errorMessage" :class="b('error')">
      <slot name="errorMessage" />
    </div>

    <div v-if="slots?.note" :class="b('note')">
      <slot name="note" />
    </div>
  </div>
</template>

<style lang="scss">
@use '../../styles/mixins';
@use '../../styles/variables';

$block: '.#{variables.$ns}outer-additional-content';

#{$block} {
  display: flex;
  justify-content: space-between;
  vertical-align: top;

  &__note,
  &__error {
    margin-block-start: 2px;
  }

  &__error {
    @include mixins.text-body-1();

    color: var(--g-color-text-danger);

    &:not(:last-child) {
      margin-inline-end: var(--g-spacing-2);
    }
  }

  &__note {
    margin-inline-start: auto;
  }
}
</style>
