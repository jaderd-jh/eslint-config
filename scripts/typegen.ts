import fs from 'node:fs/promises'
import JS from '@eslint/js'
import { flatConfigsToRulesDTS } from 'eslint-typegen/core'
import { jhqn } from '../src/factory'

const configs = await jhqn({
  astro: true,
  gitignore: true,
  jsx: {
    a11y: true,
  },
  jsonc: true,
  markdown: true,
  react: true,
  regexp: true,
  solid: true,
  stylistic: true,
  svelte: true,
  test: true,
  toml: true,
  typescript: {
    tsconfigPath: 'tsconfig.json',
    erasableOnly: true,
  },
  unicorn: true,
  unocss: true,
  vue: {
    a11y: true,
  },
  yaml: true,
}).prepend({
  plugins: {
    '': {
      rules: JS.configs.all,
    },
  },
})

const configNames = configs.map(i => i.name).filter(Boolean) as string[]

let dts = await flatConfigsToRulesDTS(configs, {
  includeAugmentation: false,
})

dts += `
// Names of all the configs
export type ConfigNames = ${configNames.map(i => `'${i}'`).join(' | ')}
`

await fs.writeFile('src/typegen.d.ts', dts)
