import type { OptionsOverrides, StylisticConfig, TypedFlatConfigItem } from '../types'
import { pluginAntfu } from '../plugins'
import { interopDefault } from '../utils'

export const StylisticConfigDefaults: StylisticConfig = {
  indent: 2,
  jsx: true,
  quotes: 'single',
  semi: false,
}

export interface StylisticOptions extends StylisticConfig, OptionsOverrides {
  lessOpinionated?: boolean
}

export async function stylistic(
  options: StylisticOptions = {},
): Promise<TypedFlatConfigItem[]> {
  const {
    indent,
    jsx,
    lessOpinionated = false,
    overrides = {},
    quotes,
    semi,
  } = {
    ...StylisticConfigDefaults,
    ...options,
  }

  const pluginStylistic = await interopDefault(import('@stylistic/eslint-plugin'))

  const config = pluginStylistic.configs.customize({
    indent,
    jsx,
    pluginName: 'style',
    quotes,
    semi,
  })

  return [
    {
      name: 'jhqn/stylistic/rules',
      plugins: {
        antfu: pluginAntfu,
        style: pluginStylistic,
      },
      rules: {
        ...config.rules,

        'antfu/consistent-chaining': 'error',
        'antfu/consistent-list-newline': 'error',

        ...(lessOpinionated
          ? {}
          : {
              'antfu/if-newline': 'error',
              'antfu/top-level-function': 'error',
            }
        ),

        'curly': ['error', 'multi-line', 'consistent'],

        'style/arrow-parens': ['error', 'as-needed'],
        'style/brace-style': ['error', '1tbs'],
        'style/comma-dangle': 'off',
        'style/indent-binary-ops': 'off',
        'style/jsx-one-expression-per-line': ['error', { allow: 'non-jsx' }],
        'style/jsx-sort-props': [
          'error',
          {
            callbacksLast: true,
            ignoreCase: true,
            locale: 'auto',
            multiline: 'ignore',
            noSortAlphabetically: false,
            reservedFirst: true,
            shorthandFirst: true,
            shorthandLast: false,
          },
        ],
        'style/jsx-wrap-multilines': [
          'error',
          {
            arrow: 'parens-new-line',
            assignment: 'parens-new-line',
            condition: 'parens-new-line',
            declaration: 'parens-new-line',
            logical: 'parens-new-line',
            prop: 'ignore',
            propertyValue: 'parens-new-line',
            return: 'parens-new-line',
          },
        ],
        'style/member-delimiter-style': [
          'error',
          {
            multiline: {
              delimiter: 'none',
              requireLast: false,
            },
            singleline: {
              delimiter: 'semi',
              requireLast: false,
            },
          },
        ],

        ...overrides,
      },
    },
  ]
}
