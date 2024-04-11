import type { TypedFlatConfigItem } from '../types'
import { pluginRegexp } from '../plugins'

export async function regexp(): Promise<TypedFlatConfigItem[]> {
  return [
    {
      name: 'jhqn:regexp',
      plugins: {
        regexp: pluginRegexp,
      },
      rules: {
        ...pluginRegexp.configs['flat/recommended'].rules,
      },
    },
  ]
}
