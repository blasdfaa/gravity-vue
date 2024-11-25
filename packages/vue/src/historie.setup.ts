import { defineSetupVue3 } from '@histoire/plugin-vue'
import WrapperGlobal from './histoire/global-wrapper.vue'

import './styles/styles.scss'

export const setupVue3 = defineSetupVue3(({ addWrapper }) => {
  addWrapper(WrapperGlobal)
})
