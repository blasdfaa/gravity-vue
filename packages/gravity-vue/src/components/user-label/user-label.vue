<script lang="ts">
import type { QAProps } from '../../types'
import type { AvatarProps, AvatarSize } from '../avatar'

export interface UserLabelProps extends QAProps {
  avatar?: Omit<AvatarProps, 'size' | 'class'> | string
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
import { GIcon } from '../icon'
import { Envelope, Xmark } from '@gravity-vue/icons'
import { slotIsText } from '../../utils/slot-is-text'
import { GAvatar } from '../avatar'

const props = withDefaults(defineProps<UserLabelProps>(), {
  size: 's',
  type: 'person',
  view: 'outlined',
})

const emits = defineEmits<UserLabelEmits>()
const slots = defineSlots()

const { b } = useBlock('user-label')

const vm = getCurrentInstance()

const clickable = computed(() => !!vm?.vnode.props?.onClick)
const closable = computed(() => !!vm?.vnode.props?.onClose)

const avatarProps = computed(() => {
  let _avatarProps: AvatarProps = {}

  if (typeof props.avatar === 'string') {
    _avatarProps.imgUrl = props.avatar
  }
  else if (props.avatar) {
    _avatarProps = props.avatar
  }
  else if (slotIsText(slots?.default)) {
    _avatarProps.text = slots.default()[0].children.trim()
  }

  if (props.type === 'email') {
    _avatarProps.icon = Envelope
  }

  return _avatarProps
})

const handleClick = (e: MouseEvent) => emits('click', e)
</script>

<template>
  <div
    :class="b({
      size,
      clickable,
      closable,
      view,
      empty: type === 'empty',
    })"
    :data-qa="qa"
  >
    <component
      :is="clickable ? 'button' : 'div'"
      :class="b('main')"
      :type="clickable ? 'button' : undefined"
      @click="handleClick"
    >
      <div v-if="type !== 'empty'" :class="b('avatar')">
        <GAvatar v-bind="avatarProps" :size="size" />
      </div>
      <div :class="b('text')">
        <slot />
      </div>
    </component>

    <button
      v-if="closable"
      :class="b('close')"
      type="button"
      @click="(e) => emits('close', e)"
    >
      <GIcon :class="b('close-icon')" :data="Xmark" :size="12" />
    </button>
  </div>
</template>

<style lang="scss">
@use '../../styles/mixins';
@use '../../styles/variables';

$block: '.#{variables.$ns}user-label';

#{$block} {
  --_transition-duration: 0.1s;
  --_transition-timing-function: ease-in-out;

  position: relative;
  z-index: 0;
  display: inline-flex;
  max-width: 100%;
  height: 28px;
  border-radius: 20px;

  transition-property: background-color;
  transition-duration: var(--_transition-duration);
  transition-timing-function: var(--_transition-timing-function);

  &_view_outlined {
    &:after {
      position: absolute;
      z-index: -1;
      inset: 0;
      content: '';
      border: 1px solid var(--g-color-line-generic);
      border-radius: 20px;

      transition-property: border-color;
      transition-duration: var(--_transition-duration);
      transition-timing-function: var(--_transition-timing-function);
    }
  }

  &_empty {
    padding-inline-start: 12px;
  }

  &_clickable:hover {
    cursor: pointer;
    background-color: var(--g-color-base-simple-hover);

    &:after {
      border-color: transparent;
    }
  }

  &__main {
    @include mixins.button-reset();

    display: inline-flex;
    align-items: center;
    min-width: 0;
    border-radius: inherit;
    padding-inline-end: 6px;

    #{$block}_closeable & {
      padding-inline-end: 0;
    }

    #{$block}_clickable & {
      outline-offset: -1px;

      &:focus-visible {
        outline: 2px solid var(--g-color-line-focus);
      }
    }
  }

  &__avatar {
    --g-avatar-background-color: var(--g-color-base-generic-accent);
    --g-avatar-color: var(--g-color-text-primary);

    display: flex;
    margin-inline-end: 6px;
  }

  &__text {
    font-size: var(--g-user-label-font-size, inherit);
    line-height: var(--g-user-label-line-height, inherit);
    min-width: 0;
    margin-inline-end: 6px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  &__close {
    @include mixins.button-reset();

    box-sizing: initial;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 16px;
    cursor: pointer;
    padding-inline-end: 6px;
    color: var(--g-color-text-secondary);

    transition-property: color;
    transition-duration: var(--_transition-duration);
    transition-timing-function: var(--_transition-timing-function);

    &:hover {
      color: var(--g-color-text-primary);
    }
  }

  &__close-icon {
    border-radius: var(--g-focus-border-radius);

    #{$block}__close:focus-visible & {
      outline: 2px solid var(--g-color-line-focus);
    }
  }

  &_size {
    @each $size-name, $size-value in variables.$avatar-sizes {
      &_#{$size-name} {
        height: #{$size-value};
      }
      &_xl::after {
        border-radius: 150px;
      }
    }
  }
}
</style>
