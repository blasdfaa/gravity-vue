<!--GITHUB_BLOCK-->

# Overlay

<!--/GITHUB_BLOCK-->

```tsx
import { Overlay } from 'gravity-vue'
```

The `Overlay` component renders an overlay over the parent element with relative position,
i.e. parent element must have `position` set to `relative`.
For example, it can be used to preserve the desired layout while loading data.

```vue
<script lang="ts" setup>
import { ref } from 'vue'
import { Box, Loader, Overlay } from 'gravity-vue'

const loading = ref(true)
</script>

<template>
  <Box position="relative">
    <div>Some content to hide under overlay</div>
    <Overlay :visible="loading">
      <Loader />
    </Overlay>
  </Box>
</template>
```

## Appearance

### Background

You can use `base` or `float` background colors.

<!--GITHUB_BLOCK-->

```vue
<Overlay background="base">
<Overlay background="float">
```

<!--/GITHUB_BLOCK-->

## Properties

| Name       | Description                         |        Type        | Default |
| :--------- | :---------------------------------- | :----------------: | :-----: |
| visible    | Overlay visibility state            |     `boolean`      | `false` |
| background | Overlay background style            | `"base"` `"float"` | `base`  |
