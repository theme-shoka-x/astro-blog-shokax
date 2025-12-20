import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  unocss: true,
  astro: true,
  svelte: true,
}).append({
  files: ['**/*.svelte'],
  rules: {
    // Svelte component props must use `export let`, which is intentionally mutable.
    'import/no-mutable-exports': 'off',
  },
})
