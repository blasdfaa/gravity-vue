import antfu from '@antfu/eslint-config'
import a11y from 'eslint-plugin-vuejs-accessibility'

export default antfu({
  vue: true,
  typescript: true,
  test: true,
  markdown: true,
  stylistic: true,
  regexp: true,
  type: 'lib',
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
    'vuejs-accessibility/label-has-for': ['error', {
      required: {
        some: ['nesting', 'id'],
      },
    }],
  },
})
