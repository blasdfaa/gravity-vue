<script setup lang="ts">
import { Envelope, Gear, Rocket } from '@gravity-vue/icons'

import Icon from '../icon.vue'

const icons = [Envelope, Gear, Rocket]
</script>

<template>
  <Story group="components" title="Data Display / Icon">
    <Variant title="Basic">
      <Icon v-for="(icon, index) in icons" :key="index" :data="icon" size="16" />
    </Variant>
  </Story>
</template>
