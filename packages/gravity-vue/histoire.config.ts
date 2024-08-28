import { HstVue } from '@histoire/plugin-vue'
import { defineConfig } from 'histoire'

export default defineConfig({
  plugins: [HstVue()],
  storyMatch: ['**/*.story.vue'],
  setupFile: './src/historie.setup.ts',
  defaultStoryProps: {
    autoPropsDisabled: true,
  },
  tree: {
    groups: [{
      id: 'components',
      title: 'Components',
    }],
  },
  vite: {
    server: {
      fs: {
        allow: ['../..'],
      },
    },
  },
})
