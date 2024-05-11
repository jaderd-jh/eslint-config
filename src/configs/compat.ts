import type { TypedFlatConfigItem } from '../types'
import { pluginEcmascriptCompat } from '../plugins'

/**
 * For ecma version compatibility checks.
 *
 * @see https://github.com/robatwilliams/es-compat/tree/master/packages/eslint-plugin-ecmascript-compat
 */
export async function compat(): Promise<TypedFlatConfigItem[]> {
  return [
    {
      name: 'jhqn/compat/rules',
      plugins: {
        'es-syntax': pluginEcmascriptCompat,
      },
      rules: {
        'es-syntax/compat': 'warn',
      },
    },
  ]
}
