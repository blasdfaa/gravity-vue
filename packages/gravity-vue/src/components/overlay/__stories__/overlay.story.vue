<script setup lang="ts">
import { ref } from 'vue'
import { GSpin } from '../../spin'
import Overlay, { type OverlayProps } from '../overlay.vue'

const state = ref<OverlayProps>({
  visible: true,
  background: 'base',
})
</script>

<template>
  <Story
    group="components"
    title="Feedback / Overlay"
    :layout="{ type: 'grid', width: '300px' }"
  >
    <Variant title="Text">
      <div :style="{ position: 'relative', padding: '20px' }">
        <div>Example of overlay</div>
        <div>with text</div>
        <Overlay v-bind="state">
          Loading...
        </Overlay>
      </div>
    </Variant>

    <Variant title="Spin">
      <div :style="{ position: 'relative', padding: '20px' }">
        <div>Example of overlay</div>
        <div>with spin</div>
        <Overlay v-bind="state">
          <GSpin />
        </Overlay>
      </div>
    </Variant>

    <Variant title="Empty">
      <div :style="{ position: 'relative', padding: '20px' }">
        <div>Example of overlay</div>
        <div>without children</div>
        <Overlay v-bind="state" />
      </div>
    </Variant>

    <template #controls>
      <HstCheckbox v-model="state.visible" title="visible" />
      <HstSelect
        v-model="state.background"
        title="background"
        :options="[
          { label: 'base', value: 'base' },
          { label: 'float', value: 'float' },
        ]"
      />
    </template>
  </Story>
</template>
