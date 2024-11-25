<script lang="ts">
import type { PolymorphicProps, QAProps } from '../../types'
import type { TextColor, TextVariant } from './types'
import type { HTMLAttributes } from 'vue'

export interface TextProps extends QAProps, PolymorphicProps,
  /**
   * @vue-ignore
   */
  HTMLAttributes {
  variant?: TextVariant
  color?: TextColor
  /**
   * hidden overflow content will be displayed with ellipsis `…`
   * - white-space: nowrap;
   * - overflow: hidden;
   * - text-overflow: ellipsis;
   */
  ellipsis?: boolean
  /**
   * With this prop you need to pass `-webkit-line-clamp` css property with number of cropped lines
   *
   * !Note: supports only modern browsers
   * https://caniuse.com/?search=display%3A%20-webkit-box%3B
   */
  ellipsisLines?: boolean | number
  /**
   * white-space css property
   */
  whiteSpace?: 'nowrap' | 'break-spaces'
  /**
   * word-break css property
   */
  wordBreak?: 'break-all' | 'break-word'
}
</script>

<script setup lang="ts">
import { ark } from '@ark-ui/vue'
import { useBlock } from '../../composables'

withDefaults(defineProps<TextProps>(), {
  variant: 'body-1',
})

const { b } = useBlock('text')
</script>

<template>
  <ark.span
    :class="b({
      color,
      variant,
      ellipsis,
      'ws': whiteSpace,
      'wb': wordBreak,
      'ellipsis-lines': Boolean(ellipsisLines || typeof ellipsisLines === 'number'),
    })"
    :as-child="asChild"
    :data-qa="qa"
    :style="{
      WebkitLineClamp: typeof ellipsisLines === 'number' ? ellipsisLines : undefined,
    }"
  >
    <slot />
  </ark.span>
</template>

<style lang="scss">
@use '../../styles/mixins';
@use '../../styles/variables';

$block: '.#{variables.$ns}text';

$textColorMap: (
  'primary' var(--g-color-text-primary),
  'complementary' var(--g-color-text-complementary),
  'secondary' var(--g-color-text-secondary),
  'hint' var(--g-color-text-hint),
  'info' var(--g-color-text-info),
  'info-heavy' var(--g-color-text-info-heavy),
  'positive' var(--g-color-text-positive),
  'positive-heavy' var(--g-color-text-positive-heavy),
  'warning' var(--g-color-text-warning),
  'warning-heavy' var(--g-color-text-warning-heavy),
  'danger' var(--g-color-text-danger),
  'danger-heavy' var(--g-color-text-danger-heavy),
  'utility' var(--g-color-text-utility),
  'utility-heavy' var(--g-color-text-utility-heavy),
  'misc' var(--g-color-text-misc),
  'misc-heavy' var(--g-color-text-misc-heavy),
  'brand' var(--g-color-text-brand),
  'link' var(--g-color-text-link),
  'link-hover' var(--g-color-text-link-hover),
  'link-visited' var(--g-color-text-link-visited),
  'link-visited-hover' var(--g-color-text-link-visited-hover),
  'dark-primary' var(--g-color-text-dark-primary),
  'dark-complementary' var(--g-color-text-dark-complementary),
  'dark-secondary' var(--g-color-text-dark-secondary),
  'light-primary' var(--g-color-text-light-primary),
  'light-complementary' var(--g-color-text-light-complementary),
  'light-secondary' var(--g-color-text-light-secondary),
  'light-hint' var(--g-color-text-light-hint),
  'inverted-primary' var(--g-color-text-inverted-primary),
  'inverted-complementary' var(--g-color-text-inverted-complementary),
  'inverted-secondary' var(--g-color-text-inverted-secondary),
  'inverted-hint' var(--g-color-text-inverted-hint)
);

#{$block} {
  @each $mod, $value in $textColorMap {
    &_color_#{$mod} {
      color: $value;
    }
  }

  &_variant_display-1 {
    @include mixins.text-display-1();
  }
  &_variant_display-2 {
    @include mixins.text-display-2();
  }
  &_variant_display-3 {
    @include mixins.text-display-3();
  }
  &_variant_display-4 {
    @include mixins.text-display-4();
  }
  &_variant_code-1 {
    @include mixins.text-code-1();
  }
  &_variant_code-2 {
    @include mixins.text-code-2();
  }
  &_variant_code-3 {
    @include mixins.text-code-3();
  }
  &_variant_code-inline-1 {
    @include mixins.text-code-inline-1();
  }
  &_variant_code-inline-2 {
    @include mixins.text-code-inline-2();
  }
  &_variant_code-inline-3 {
    @include mixins.text-code-inline-3();
  }
  &_variant_body-1 {
    @include mixins.text-body-1();
  }
  &_variant_body-2 {
    @include mixins.text-body-2();
  }
  &_variant_body-3 {
    @include mixins.text-body-3();
  }
  &_variant_body-short {
    @include mixins.text-body-short();
  }
  &_variant_caption-1 {
    @include mixins.text-caption-1();
  }
  &_variant_caption-2 {
    @include mixins.text-caption-2();
  }
  &_variant_header-1 {
    @include mixins.text-header-1();
  }
  &_variant_header-2 {
    @include mixins.text-header-2();
  }
  &_variant_subheader-1 {
    @include mixins.text-subheader-1();
  }
  &_variant_subheader-2 {
    @include mixins.text-subheader-2();
  }
  &_variant_subheader-3 {
    @include mixins.text-subheader-3();
  }
  &_ellipsis {
    display: inline-block;
    @include mixins.overflow-ellipsis();
  }

  &_ellipsis-lines {
    display: -webkit-box; // stylelint-disable-line value-no-vendor-prefix
    -webkit-box-orient: vertical;
    overflow: hidden;
    align-self: center;
    white-space: normal;
    // by default clamp 2 lines
    -webkit-line-clamp: 2;
  }

  &_ws_nowrap {
    white-space: nowrap;
  }
  &_ws_break-spaces {
    white-space: break-spaces;
  }
  &_wb_break-all {
    word-break: break-all;
  }
  &_wb_break-word {
    word-break: break-word;
  }
}
</style>
