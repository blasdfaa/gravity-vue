<script setup lang="ts">
import Icon from '../icon.vue'

const CheckIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
<path d="M13.488 3.43a.75.75 0 0 1 .081 1.058l-6 7a.75.75 0 0 1-1.1.042l-3.5-3.5A.75.75 0 0 1 4.03 6.97l2.928 2.927 5.473-6.385a.75.75 0 0 1 1.057-.081Z" />
</svg>`
</script>

<template>
  <Story group="components" title="Data Display / Icon">
    <Variant title="Basic">
      <Icon :data="CheckIcon" size="16" />
    </Variant>
  </Story>
</template>
