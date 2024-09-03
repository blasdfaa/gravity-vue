<script setup lang="ts">
import { FaceRobot } from '@gravity-vue/icons'
import Avatar from '../avatar.vue'
</script>

<template>
  <Story
    group="components"
    title="Data Display / Avatar"
    :layout="{ type: 'grid', width: 100 }"
  >
    <Variant title="Basic">
      <Avatar img-url="https://loremflickr.com/640/480" />
    </Variant>

    <Variant title="With srcSet">
      <Avatar
        img-url="https://loremflickr.com/640/480/cats"
        src-set="https://loremflickr.com/61/46/cats 1x, https://loremflickr.com/111/83/cats 2x, https://loremflickr.com/158/119/cats 3x, https://loremflickr.com/211/158/cats 4x"
        size="xl"
      />
    </Variant>

    <Variant title="Fallback">
      <Avatar
        img-url="broken url"
        fallback-img-url="https://loremflickr.com/61/46/cats"
      />
    </Variant>

    <Variant title="Icon">
      <Avatar
        theme="brand"
        :icon="FaceRobot"
      />
    </Variant>

    <Variant title="Text">
      <Avatar
        theme="brand"
        text="UI"
      />
    </Variant>

    <Variant title="Text initials">
      <Avatar
        theme="brand"
        text="Charles Darwin"
      />
    </Variant>

    <Variant title="Outlined">
      <Avatar
        view="outlined"
        text="Charles Darwin"
      />
    </Variant>

    <Variant title="With border">
      <Avatar
        img-url="https://loremflickr.com/640/480/cats"
        border-color="var(--g-color-line-misc)"
      />
    </Variant>
  </Story>
</template>
