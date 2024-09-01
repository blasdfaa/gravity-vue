<script lang="ts">
import { type HTMLAttributes, computed, ref, watch } from 'vue'
import type { PolymorphicProps, QAProps } from '../../types'
import type { AvatarSize, AvatarTheme, AvatarView } from './types'

export interface AvatarProps extends QAProps, PolymorphicProps,
  /**
   * @vue-ignore
   */
  HTMLAttributes {
  /**
   * @default 'm'
   */
  size?: AvatarSize
  /**
   * @default 'normal'
   */
  theme?: AvatarTheme
  /**
   * @default 'filled'
   */
  view?: AvatarView
  imgUrl?: string
  fallbackImgUrl?: string
  sizes?: string
  srcSet?: string
  alt?: string
  loading?: 'eager' | 'lazy'
  icon?: any
  color?: string
  text?: string
  /** Image CORS settings */
  crossorigin?: string
  /** Referrer policy for fetch https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy */
  referrerPolicy?: HTMLImageElement['referrerPolicy']
  borderColor?: string
}
</script>

<script setup lang="ts">
import { avatarSizeToIconSize, avatarSizeToImgSize } from './constants'
import { useBlock } from '../../composables'
import { getInitials } from './utils'

const props = withDefaults(defineProps<AvatarProps>(), {
  size: 'm',
  theme: 'normal',
  view: 'filled',
})

const { b } = useBlock('avatar')

const isErrored = ref(false)

const imgSize = computed(() => avatarSizeToImgSize[props.size])
const iconSize = computed(() => avatarSizeToIconSize[props.size])
const displayText = computed(() => props?.text ? getInitials(props.text) : '')

function handleError() {
  isErrored.value = true
}

// Reset error if `imgUrl` was changed to check it again
watch(
  () => props.imgUrl,
  () => isErrored.value = false,
)
</script>

<template>
  <div
    :class="b({ size, theme, view, 'with-border': Boolean(borderColor) })"
    role="img"
    :data-qa="qa"
  >
    <img
      v-if="imgUrl"
      :class="b('image')"
      :loading="loading"
      :width="imgSize"
      :height="imgSize"
      :src="fallbackImgUrl && isErrored ? fallbackImgUrl : imgUrl"
      :sizes="sizes"
      :srcSet="srcSet"
      :alt="alt"
      @error="handleError"
    >

    <div v-if="icon" :style="{ color }" :class="b('icon')">
      <Icon :data="icon" :size="iconSize" />
    </div>

    <div v-if="text" :style="{ color }" :class="b('text')">
      {{ displayText }}
    </div>
  </div>
</template>

<style lang="scss">
@use '../../styles/variables';
@use 'sass:map';

$sizes: (
  'xs': 24px,
  's': 28px,
  'm': 32px,
  'l': 42px,
  'xl': 50px,
);

$default-size: map.get($sizes, 'm');

$block: '.#{variables.$ns}avatar';

#{$block} {
  --_size: $default-size;
  --_background-color: var(--g-color-base-misc-light);
  --_border-color: currentColor;
  --_color: var(--g-color-text-misc);
  --_font-size: var(--g-text-body-1-font-size);
  --_line-height: var(--g-text-body-1-line-height);
  --_font-weight: var(--g-text-body-font-weight);

  overflow: hidden;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: var(--g-avatar-size, var(--_size));
  height: var(--g-avatar-size, var(--_size));
  border-radius: 50%;
  background-color: var(--g-avatar-background-color, var(--_background-color));

  &__image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__icon {
    color: var(--g-avatar-color, var(--_color));

    & > svg {
      display: block;
    }
  }

  &__text {
    color: var(--g-avatar-color, var(--_color));
    font-size: var(--g-avatar-font-size, var(--_font-size));
    line-height: var(--g-avatar-line-height, var(--_line-height));
    font-weight: var(--_font-weight);
  }

  &_with-border,
  &_view_outlined {
    position: relative;

    &::before,
    &::after {
      content: '';
      z-index: 1;
      position: absolute;
      inset: 0;
      border-radius: 50%;
    }

    &::before {
      border: 3px solid var(--g-color-base-background);
    }

    &::after {
      border: 2px solid var(--g-avatar-border-color, var(--_border-color));
    }
  }

  &_size {
    @each $size-name, $size-value in $sizes {
      &_#{$size-name} {
        --_size: #{$size-value};
      }
    }

    &_xs,
    &_s {
      --_font-size: var(--g-text-caption-1-font-size);
      --_line-height: var(--g-text-caption-1-line-height);
      --_font-weight: var(--g-text-caption-font-weight);
    }

    &_m,
    &_l {
      --_font-size: var(--g-text-subheader-1-font-size);
      --_line-height: var(--g-text-subheader-1-line-height);
      --_font-weight: var(--g-text-subheader-font-weight);
    }

    &_xl {
      --_font-size: var(--g-text-subheader-2-font-size);
      --_line-height: var(--g-text-subheader-2-line-height);
      --_font-weight: var(--g-text-subheader-font-weight);
    }
  }

  &_theme {
    &_normal {
      &#{$block}_view {
        &_filled {
          --_background-color: var(--g-color-base-misc-light);
          --_color: var(--g-color-text-misc);
        }

        &_outlined {
          --_background-color: var(--g-color-base-background);
          --_border-color: var(--g-color-text-misc);
          --_color: var(--g-color-text-misc);
        }
      }
    }

    &_brand {
      &#{$block}_view {
        &_filled {
          --_background-color: var(--g-color-base-brand);
          --_color: var(--g-color-text-brand-contrast);
        }

        &_outlined {
          --_background-color: var(--g-color-base-background);
          --_border-color: var(--g-color-text-brand);
          --_color: var(--g-color-text-brand);
        }
      }
    }
  }
}
</style>
