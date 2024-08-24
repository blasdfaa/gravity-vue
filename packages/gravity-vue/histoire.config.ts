import { HstVue } from '@histoire/plugin-vue'
import { defineConfig } from 'histoire'

export default defineConfig({
  plugins: [HstVue()],
  storyMatch: ['**/*.story.vue'],
  setupFile: './src/historie.setup.ts',
  tree: {
    groups: [{
      id: 'components',
      title: 'Components',
    }],
  },
})
