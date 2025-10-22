import fs from 'node:fs/promises'
import JS from '@eslint/js'
import { flatConfigsToRulesDTS } from 'eslint-typegen/core'
import {
  astro,
  combine,
  comments,
  // compat,
  imports,
  javascript,
  jsdoc,
  jsonc,
  jsx,
  markdown,
  node,
  perfectionist,
  react,
  regexp,
  solid,
  sortPackageJson,
  stylistic,
  svelte,
  test,
  toml,
  typescript,
  unicorn,
  unocss,
  vue,
  yaml,
} from '../src'

const configs = await combine(
  {
    plugins: {
      '': {
        rules: JS.configs.all,
      },
    },
  },
  astro(),
  comments(),
  // compat(),
  imports(),
  javascript(),
  jsdoc(),
  jsonc(),
  jsx({ a11y: true }),
  markdown(),
  node(),
  perfectionist(),
  react(),
  regexp(),
  solid(),
  sortPackageJson(),
  stylistic(),
  svelte(),
  test(),
  toml(),
  typescript(),
  unicorn(),
  unocss(),
  vue(),
  yaml(),
)

const configNames = configs.map(i => i.name).filter(Boolean) as string[]

let dts = await flatConfigsToRulesDTS(configs, {
  includeAugmentation: false,
})

dts += `
// Names of all the configs
export type ConfigNames = ${configNames.map(i => `'${i}'`).join(' | ')}
`

await fs.writeFile('src/typegen.d.ts', dts)
