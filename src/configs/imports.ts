import type { TypedFlatConfigItem } from '../types'
import { pluginAntfu, pluginImport } from '../plugins'

export async function imports(): Promise<TypedFlatConfigItem[]> {
  return [
    {
      name: 'jhqn/imports/rules',
      plugins: {
        antfu: pluginAntfu,
        import: pluginImport,
      },
      rules: {
        'antfu/import-dedupe': 'error',
        'antfu/no-import-dist': 'error',
        'antfu/no-import-node-modules-by-path': 'error',

        'import/export': 'error',
        'import/first': 'error',
        'import/no-absolute-path': ['error', { amd: false, commonjs: true, esmodule: true }],
        // 'import/no-deprecated': 'warn',
        'import/no-duplicates': 'error',
        'import/no-empty-named-blocks': 'error',
        'import/no-mutable-exports': 'error',
        'import/no-named-default': 'error',
        'import/no-self-import': 'error',
        // 'import/no-unresolved': [
        //   'error',
        //   { caseSensitive: true, caseSensitiveStrict: true, commonjs: true, ignore: ['^virtual:', '^uno.css$'] },
        // ],
        'import/no-webpack-loader-syntax': 'error',

        'import/order': 'error',
      },
      settings: {
        'import/docstyle': ['jsdoc'],
        'import/extensions': ['.js', '.mjs', '.jsx', '.ts', '.tsx', '.d.ts'],
        'import/external-module-folders': ['node_modules', 'node_modules/@types'],
        'import/parsers': {
          '@typescript-eslint/parser': ['.d.ts', '.ts', '.tsx'],
          'espree': ['.js', '.cjs', '.mjs', '.jsx'],
        },
        'import/resolver': {
          node: { extensions: ['.d.ts', '.ts', '.tsx', '.mts', '.cts', '.js', '.jsx', '.mjs', '.cjs'] },
          typescript: {
            alwaysTryTypes: true,
            project: './tsconfig.json',
          },
        },
      },
    },
  ]
}
