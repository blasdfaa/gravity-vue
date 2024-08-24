<script lang="ts">
import { type InputHTMLAttributes, computed } from 'vue'
import type { TextInputPin, TextInputSize, TextInputView } from './types'
import type { QAProps } from '../../types'
import { ControlOuterContent } from '../control-outer-content'
import { useBlock, useId } from '../../composables'

export interface TextInputProps extends
  QAProps,
  /** @vue-ignore */
  InputHTMLAttributes {
  id?: string
  /**
   * Help text rendered to the left of the input node
   */
  label?: string
  /**
   * Determines content of the error message
   */
  errorMessage?: string
  /**
   * Determines whether the error message will be placed under the input field as text or in the tooltip
   * @default 'outside'
   */
  errorPlacement?: 'outside' | 'inside'
  /**
   * Describes the validation state
   */
  validationState?: 'invalid'
  /**
   * Shows icon for clearing control's value
   * @default false
   */
  // hasClear?: boolean
  /**
   * The control's border view.
   * @default 'round-round'
   */
  pin?: TextInputPin
  /**
   * The control's size.
   * @default 'm'
   */
  size?: TextInputSize
  /**
   * The control's view.
   * @default 'normal'
   */
  view?: TextInputView
  disabled?: boolean
  /**
   * An optional element displayed under the lower right corner of the control and sharing the place with the error container
   */
  note?: string
}

export type TextInputEmits = {
  update: [value: string]
}

export type TextInputSlots = {
  startContent?: () => any
  endContent?: () => any
  errorMessage?: () => any
  note?: () => any
}
</script>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TextInputProps>(), {
  view: 'normal',
  size: 'm',
  pin: 'round-round',
  errorPlacement: 'outside',
  disabled: false,
  hasClear: false,
  type: 'text',
})

const slots = defineSlots<TextInputSlots>()

const modelValue = defineModel<string>()

const { attrs, b } = useBlock('text-input')

const state = computed(() => props.validationState === 'invalid' ? 'error' : undefined)

const hasErrorMessage = computed(() => Boolean(props.errorMessage || slots?.errorMessage))
const hasNote = computed(() => Boolean(props.note || slots?.note))

const isLabelVisible = computed(() => Boolean(props.label))
const isClearControlVisible = computed(() => Boolean(props.hasClear && !props.disabled && modelValue.value))
// const isInvalidWithMessage = computed(() => props.validationState === 'invalid' && hasErrorMessage.value)
// const isErrorMessageVisible = computed(() => isInvalidWithMessage.value && props.errorPlacement === 'outside')
// const isErrorIconVisible = computed(() => isInvalidWithMessage.value && props.errorPlacement === 'inside')
const isStartContentVisible = computed(() => Boolean(slots?.startContent))
const isEndContentVisible = computed(() => Boolean(slots?.endContent))
const isOuterContentVisible = computed(() => hasErrorMessage.value || hasNote.value)

const errorMessageId = useId()
const noteId = useId()
</script>

<template>
  <span
    :data-qa="qa"
    :class="b({
      view,
      size,
      disabled,
      state,
      'pin': view === 'clear' ? undefined : pin,
      'has-clear': isClearControlVisible,
      'has-start-content': isStartContentVisible,
      'has-end-content': isClearControlVisible || isEndContentVisible,
    })"
  >
    <span :class="b('content')">
      <label
        v-if="isLabelVisible"
        :title="label"
        :for="id"
        :class="b('label')"
      />
      <input
        v-model="modelValue"
        :class="b('control', { type: 'input' })"
        v-bind="attrs"
      >
    </span>

    <ControlOuterContent
      v-if="isOuterContentVisible"
      :error-message-id="errorMessageId"
      :note-id="noteId"
    >
      <template #note>
        <slot name="note">{{ note }}</slot>
      </template>
      <template #errorMessage>
        <slot name="errorMessage">{{ errorMessage }}</slot>
      </template>
    </ControlOuterContent>
  </span>
</template>

<style lang="scss">
@use '../../styles/mixins';
@use '../../styles/variables';

@mixin input-label($size) {
  @if $size == 's' {
    @include mixins.text-body-short;

    padding-block: 3px;
    padding-inline: 8px 4px;
  }

  @if $size == 'm' {
    @include mixins.text-body-short;

    padding-block: 5px;
    padding-inline: 8px 4px;
  }

  @if $size == 'l' {
    @include mixins.text-body-short;

    padding-block: 9px;
    padding-inline: 12px 4px;
  }

  @if $size == 'xl' {
    @include mixins.text-body-2;

    padding-block: 11px;
    padding-inline: 12px 4px;
  }

  @include mixins.text-accent;
}

$block: '.#{variables.$ns}text-input';

#{$block} {
  --_text-color: var(--g-color-text-primary);
  --_label-color: inherit;
  --_placeholder-color: var(--g-color-text-hint);
  --_background-color: transparent;
  --_border-width: 1px;
  --_focus-outline-color: var(--g-text-input-focus-outline-color);

  --_text-input-control-height-xl: #{variables.$xl-height};
  --_text-input-control-height-l: #{variables.$l-height};
  --_text-input-control-height-m: #{variables.$m-height};
  --_text-input-control-height-s: #{variables.$s-height};

  display: inline-block;
  width: 100%;
  position: relative;

  &__content {
    box-sizing: border-box;
    // It's fixing input overflowed behaviour
    // Input itself doesn't have a border radius, but content has.
    // And it could cause a render problem,
    // when input accidentally goes beyond the wrapper
    overflow: hidden;
    display: flex;
    width: 100%;
    background-color: var(
      --g-text-input-background-color,
      var(--_background-color)
    );
    border-width: var(--g-text-input-border-width, var(--_border-width));
    border-style: solid;
    border-color: var(--g-text-input-border-color, var(--_border-color));
    color: var(--g-text-input-text-color, var(--_text-color));

    &:hover {
      border-color: var(
        --g-text-input-border-color-hover,
        var(--_border-color-hover)
      );
    }

    &:focus-within {
      border-color: var(
        --g-text-input-border-color-active,
        var(--_border-color-active)
      );
      outline: 2px solid
        var(--g-text-input-focus-outline-color, var(--_focus-outline-color));
      outline-offset: -1px;
    }
  }

  &__control {
    box-sizing: border-box;
    display: inline-block;
    flex-grow: 1;
    vertical-align: top;
    position: relative;
    margin: 0;
    padding: 0;
    width: 100%;
    font-weight: var(--g-text-body-font-weight);
    font-family: var(--g-text-body-font-family);
    color: inherit;
    background-color: transparent;
    border: none;
    height: var(--g-text-input-height);

    &::placeholder {
      color: var(--g-text-input-placeholder-color, var(--_placeholder-color));
      overflow: hidden;
      white-space: nowrap;
    }

    &:focus {
      outline: none;
    }

    &[type='number'] {
      appearance: textfield;
    }
  }

  &__label {
    position: absolute;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    z-index: 1;
    color: var(--g-text-input-label-color, var(--_label-color));
  }

  &__clear {
    flex-shrink: 0;
    margin: auto 0;

    &_size_s,
    &_size_m {
      margin-inline-end: 1px;
    }

    &_size_l,
    &_size_xl {
      margin-inline-end: 2px;
    }
  }

  &__error-icon {
    box-sizing: content-box;
    color: var(--g-color-text-danger);
    padding-block: var(--_error-icon-padding-block);
    padding-inline: var(--_error-icon-padding-inline);
  }

  &__additional-content {
    display: flex;
    align-items: center;
    height: calc(var(--_additional-content-height) - var(--_border-width) * 2);
  }

  &_size {
    &_s {
      #{$block}__control {
        @include mixins.input-control(s);
      }

      #{$block}__label {
        @include input-label(s);
      }

      &#{$block}_has-start-content #{$block}__label {
        padding-inline-start: 2px;
      }

      #{$block}__additional-content_placement_start {
        padding-inline-start: 1px;
      }

      #{$block}__additional-content_placement_end {
        padding-inline-end: 1px;
      }

      --_additional-content-height: var(--_text-input-control-height-s);

      --_error-icon-padding-block: 5px;
      --_error-icon-padding-inline: 0 5px;

      --_border-radius: var(--g-border-radius-s);
    }

    &_m {
      --_additional-content-height: var(--_text-input-control-height-m);

      #{$block}__control {
        @include mixins.input-control(m);
      }

      #{$block}__label {
        @include input-label(m);
      }

      &#{$block}_has-start-content #{$block}__label {
        padding-inline-start: 2px;
      }

      #{$block}__additional-content_placement_start {
        padding-inline-start: 1px;
      }

      #{$block}__additional-content_placement_end {
        padding-inline-end: 1px;
      }

      --_error-icon-padding-block: 5px;
      --_error-icon-padding-inline: 0 5px;

      --_border-radius: var(--g-border-radius-m);
    }

    &_l {
      #{$block}__control {
        @include mixins.input-control(l);
      }

      #{$block}__label {
        @include input-label(l);
      }

      &#{$block}_has-start-content #{$block}__label {
        padding-inline-start: 3px;
      }

      #{$block}__additional-content_placement_start {
        padding-inline-start: 3px;
      }

      #{$block}__additional-content_placement_end {
        padding-inline-end: 3px;
      }

      --_additional-content-height: var(--_text-input-control-height-l);

      --_error-icon-padding-block: 9px;
      --_error-icon-padding-inline: 0 9px;

      --_border-radius: var(--g-border-radius-l);
    }

    &_xl {
      #{$block}__control {
        @include mixins.input-control(xl);
      }

      #{$block}__label {
        @include input-label(xl);
      }

      &#{$block}_has-start-content #{$block}__label {
        padding-inline-start: 3px;
      }

      #{$block}__additional-content_placement_start {
        padding-inline-start: 3px;
      }

      #{$block}__additional-content_placement_end {
        padding-inline-end: 3px;
      }

      --_additional-content-height: var(--_text-input-control-height-xl);

      --_error-icon-padding-block: 13px;
      --_error-icon-padding-inline: 0 13px;

      --_border-radius: var(--g-border-radius-xl);
    }
  }

  &_view {
    &_normal {
      --_border-color: var(--g-color-line-generic);
      --_border-color-hover: var(--g-color-line-generic-hover);
      --_border-color-active: var(--g-color-line-generic-active);
    }

    &_clear {
      --_border-color: transparent;
      --_border-color-hover: transparent;
      --_border-color-active: transparent;
      --_border-radius: 0;

      & #{$block}__content {
        border-inline: 0;
      }

      & #{$block}__control {
        padding-inline: 0;
      }
    }
  }

  @include mixins.pin(
    $block,
    #{$block}__content,
    var(--g-text-input-border-radius, var(--_border-radius)),
    $append: false
  );

  &_disabled {
    --_text-color: var(--g-color-text-hint);
    --_background-color: var(--g-color-base-generic-accent-disabled);
    --_border-color: transparent;
    --_border-color-hover: transparent;
    --_border-color-active: transparent;
  }

  &_has-scrollbar {
    #{$block}__clear {
      inset-inline-end: var(--g-scrollbar-width);
    }
  }

  &_has-start-content {
    #{$block}__control {
      padding-inline-start: 2px;
    }
  }

  &_has-end-content {
    #{$block}__control {
      padding-inline-end: 2px;
    }
  }

  &_state {
    &_error {
      &#{$block}_view_normal {
        #{$block}__content {
          &,
          &:hover,
          &:focus-within {
            border-color: var(--g-color-line-danger);
          }

          &:focus-within {
            --_focus-outline-color: var(--g-color-line-danger);
          }
        }
      }

      &#{$block}_view_clear {
        #{$block}__content {
          &,
          &:hover,
          &:focus-within {
            border-block-end: 1px solid var(--g-color-line-danger);
          }

          &:focus-within {
            --_focus-outline-color: var(--g-color-line-danger);
          }
        }
      }
    }
  }
}
</style>
