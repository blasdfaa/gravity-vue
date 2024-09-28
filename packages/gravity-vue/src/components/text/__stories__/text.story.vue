<script setup lang="ts">
import { GButton } from '../../button'
import { GTextInput } from '../../text-input'
import Text from '../text.vue'

const loremText = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates asperiores accusamus est, ab rerum harum hic delectus fuga veniam! Hic, atque, quia sunt consectetur eius corrupti, expedita sapiente exercitationem aperiam quibusdam libero ipsa veritatis quisquam! Debitis eos unde, blanditiis ipsam adipisci, soluta incidunt architecto quidem, repellat commodi tempore! Enim assumenda nam esse laudantium sequi quaerat maiores, voluptatum quibusdam temporibus nulla perspiciatis! Corrupti error aliquid iure asperiores voluptate. Nisi temporibus nesciunt quasi animi, accusamus officia debitis voluptatum ratione ullam delectus, adipisci, repellendus vitae in amet sit magni iste impedit? Exercitationem rerum impedit sed earum iusto modi et officia aspernatur quibusdam? Fugit.'
</script>

<template>
  <Story group="components" title="Data Display / Text">
    <Variant title="Basic">
      <Text variant="display-1">
        display-1 text
      </Text>
    </Variant>

    <Variant title="Ellipsis">
      <div :style="{ display: 'flex', flexDirection: 'column', gap: '20px' }">
        <div :style="{ width: '200px', display: 'flex', flexDirection: 'column', gap: '20px' }">
          <Text variant="header-1">
            With fixed container size (ellipsis=true)
          </Text>
          <Text ellipsis>
            {{ loremText }}
          </Text>
        </div>

        <div :style="{ display: 'flex', flexDirection: 'column', gap: '20px' }">
          <Text variant="header-1">
            With line clamp property (ellipsisLines=3)
          </Text>
          <Text :ellipsis-lines="3">
            {{ loremText }}
          </Text>
        </div>
      </div>
    </Variant>

    <Variant title="WordBreak">
      <div
        :style="{
          width: '200px',
          height: '200px',
          border: '2px solid black',
        }"
      >
        <Text word-break="break-all">
          {{ loremText }}
        </Text>
      </div>
    </Variant>

    <Variant title="Label with controlled focus">
      <div style="display: flex;gap: 20px;">
        <Text as-child>
          <label for="some-id">
            Click on label to control text input
          </label>
        </Text>

        <GTextInput id="some-id" />
      </div>
    </Variant>

    <Variant title="With custom element render">
      <div style="display: flex;gap: 20px;flex-direction: column;">
        <Text as-child>
          <code style="white-space: pre-wrap;">
            {{
              `<Text color="danger-heavy" variant="header-1" as-child>
    <Button size="m" view="action">
        Hello World!
    </Button>
</Text>`
            }}
          </code>
        </Text>

        <Text color="danger-heavy" variant="header-1" as-child>
          <GButton size="m" view="action">
            Hello World!
          </GButton>
        </Text>
      </div>
    </Variant>
  </Story>
</template>
