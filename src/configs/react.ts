import { GLOB_JSX, GLOB_TSX } from '../globs'
import type { OptionsFiles, OptionsHasTypeScript, OptionsOverrides, TypedFlatConfigItem } from '../types'
import { ensurePackages, interopDefault } from '../utils'

export async function react(
  options: OptionsHasTypeScript & OptionsOverrides & OptionsFiles = {},
): Promise<TypedFlatConfigItem[]> {
  const {
    files = [GLOB_JSX, GLOB_TSX],
    overrides = {},
    typescript = true,
  } = options

  await ensurePackages([
    'eslint-plugin-react',
    'eslint-plugin-react-hooks',
  ])

  const [
    pluginReact,
    pluginReactHooks,
  ] = await Promise.all([
    interopDefault(import('eslint-plugin-react')),
    interopDefault(import('eslint-plugin-react-hooks')),
  ] as const)

  return [
    {
      name: 'jhqn/react/setup',
      plugins: {
        'react': pluginReact,
        'react-hooks': pluginReactHooks,
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
    },
    {
      files,
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      name: 'jhqn/react/rules',
      rules: {
        // recommended rules react-hooks
        'react-hooks/exhaustive-deps': 'warn',
        'react-hooks/rules-of-hooks': 'error',

        // recommended rules react
        'react/display-name': 'error',
        'react/jsx-key': 'error',
        'react/jsx-no-comment-textnodes': 'error',
        'react/jsx-no-duplicate-props': 'error',
        'react/jsx-no-target-blank': 'error',
        'react/jsx-no-undef': 'error',
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
        'react/no-children-prop': 'error',
        'react/no-danger-with-children': 'error',
        'react/no-deprecated': 'error',
        'react/no-direct-mutation-state': 'error',
        'react/no-find-dom-node': 'error',
        'react/no-is-mounted': 'error',
        'react/no-render-return-value': 'error',
        'react/no-string-refs': 'error',
        'react/no-unescaped-entities': 'error',
        'react/no-unknown-property': 'error',
        'react/no-unsafe': 'off',
        'react/prop-types': 'error',
        'react/react-in-jsx-scope': 'off',
        'react/require-render-return': 'error',

        ...typescript
          ? {
              'react/jsx-no-undef': 'off',
              'react/prop-type': 'off',
            }
          : {},

        // overrides
        ...overrides,
      },
    },
  ]
}
