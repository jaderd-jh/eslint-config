import type { OptionsFiles, OptionsOverrides, TypedFlatConfigItem } from '../types'
import { GLOB_ASTRO } from '../globs'
import { interopDefault } from '../utils'

export async function astro(
  options: OptionsOverrides & OptionsFiles = {},
): Promise<TypedFlatConfigItem[]> {
  const {
    files = [GLOB_ASTRO],
    overrides = {},
  } = options

  const [
    pluginAstro,
    parserAstro,
    parserTs,
  ] = await Promise.all([
    interopDefault(import('eslint-plugin-astro')),
    interopDefault(import('astro-eslint-parser')),
    interopDefault(import('@typescript-eslint/parser')),
  ] as const)

  return [
    {
      name: 'jhqn/astro/setup',
      plugins: {
        astro: pluginAstro,
      },
    },
    {
      files,
      languageOptions: {
        parser: parserAstro,
        parserOptions: {
          extraFileExtensions: ['.astro'],
          parser: parserTs as any,
        },
      },
      name: 'jhqn/astro/rules',
      rules: {
        'astro/no-set-html-directive': 'off',
        'astro/semi': 'off',

        'style/indent': 'off',
        'style/jsx-closing-tag-location': 'off',
        'style/jsx-indent': 'off',
        'style/jsx-one-expression-per-line': 'off',
        'style/no-multiple-empty-lines': 'off',

        ...overrides,
      },
    },
  ]
}
