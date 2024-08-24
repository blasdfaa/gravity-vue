import antfu from '@antfu/eslint-config'
import a11y from 'eslint-plugin-vuejs-accessibility'

export default antfu({
  formatters: {
    css: true,
  },
  plugins: {
    'vuejs-accessibility': a11y,
  },
  rules: {
    ...a11y.configs.recommended.rules,
    'ts/consistent-type-definitions': 'off',
    'import/first': ['off'],
    'import/order': ['off'],
    'curly': ['error', 'multi-line'],
    'antfu/if-newline': 'off',
  },
})
