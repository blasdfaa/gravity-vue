<script setup lang="ts">
import UserLabel from '../user-label.vue'

const person = 'Charles Darwin'
</script>

<template>
  <Story
    group="components"
    title="Data Display / UserLabel"
    :layout="{ type: 'grid', width: 300 }"
  >
    <Variant title="Basic">
      <UserLabel>
        {{ person }}
      </UserLabel>
    </Variant>

    <Variant title="Image">
      <UserLabel avatar="https://loremflickr.com/640/480/cats">
        {{ person }}
      </UserLabel>
    </Variant>

    <Variant title="Email">
      <UserLabel type="email">
        example@email.com
      </UserLabel>
    </Variant>

    <Variant title="Empty">
      <UserLabel type="empty">
        {{ person }}
      </UserLabel>
    </Variant>

    <Variant title="Clickable">
      <UserLabel @click="(e) => console.log('clickable event', e)">
        {{ person }}
      </UserLabel>
    </Variant>

    <Variant title="Closable">
      <UserLabel @close="(e) => console.log('closable event', e)">
        {{ person }}
      </UserLabel>
    </Variant>
  </Story>
</template>
