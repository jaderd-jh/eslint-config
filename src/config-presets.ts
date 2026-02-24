import type { OptionsConfig } from './types'

// @keep-sorted
export const CONFIG_PRESET_FULL_ON: OptionsConfig = {
  astro: true,
  gitignore: true,
  jsdoc: true,
  jsonc: true,
  jsx: {
    a11y: true,
  },
  markdown: true,
  node: true,
  react: {
    reactCompiler: true,
  },
  regexp: true,
  solid: true,
  stylistic: {
    experimental: true,
  },
  svelte: true,
  test: true,
  toml: true,
  typescript: {
    erasableOnly: true,
    tsconfigPath: 'tsconfig.json',
  },
  unicorn: true,
  unocss: true,
  vue: {
    a11y: true,
  },
  yaml: true,
}
