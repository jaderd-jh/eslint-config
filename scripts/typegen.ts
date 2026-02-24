import fs from 'node:fs/promises'
import JS from '@eslint/js'
import { flatConfigsToRulesDTS } from 'eslint-typegen/core'
import { CONFIG_PRESET_FULL_ON } from '../src/config-presets'
import { jhqn } from '../src/factory'

const configs = await jhqn(CONFIG_PRESET_FULL_ON).prepend({
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
