import type { FlatConfigItem } from '../types'
import { pluginRegexp } from '../plugins'

export async function regexp(): Promise<FlatConfigItem[]> {
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
