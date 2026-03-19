import type { OptionsComponentExts, OptionsFiles, OptionsMarkdown, TypedFlatConfigItem } from '../types'
import { mergeProcessors, processorPassThrough } from 'eslint-merge-processors'
import { GLOB_MARKDOWN, GLOB_MARKDOWN_CODE, GLOB_MARKDOWN_IN_MARKDOWN } from '../globs'
import { interopDefault } from '../utils'

export async function markdown(
  options: OptionsFiles & OptionsComponentExts & OptionsMarkdown = {},
): Promise<TypedFlatConfigItem[]> {
  const {
    componentExts = [],
    files = [GLOB_MARKDOWN],
    gfm = true,
    overrides = {},
    overridesMarkdown = {},
  } = options

  const markdownPlugin = await interopDefault(import('@eslint/markdown'))

  return [
    {
      name: 'jhqn/markdown/setup',
      plugins: {
        markdown: markdownPlugin,
      },
    },
    {
      files,
      ignores: [GLOB_MARKDOWN_IN_MARKDOWN],
      name: 'jhqn/markdown/processor',
      // `@eslint/markdown` only creates virtual files for code blocks,
      // but not the markdown file itself. We use `eslint-merge-processors` to
      // add a pass-through processor for the markdown file itself.
      processor: mergeProcessors([
        markdownPlugin.processors!.markdown,
        processorPassThrough,
      ]),
    },
    {
      files,
      language: gfm ? 'markdown/gfm' : 'markdown/commonmark',
      name: 'jhqn/markdown/parser',
    },
    {
      files,
      name: 'jhqn/markdown/rules',
      rules: {
        ...markdownPlugin.configs.recommended.at(0)?.rules,
        'markdown/fenced-code-language': 'off',
        // https://github.com/eslint/markdown/issues/294
        'markdown/no-missing-label-refs': 'off',
        ...overridesMarkdown,
      },
    },
    {
      files,
      name: 'jhqn/markdown/disables/markdown',
      rules: {
        // Disable rules do not work with markdown sourcecode.
        'command/command': 'off',
        'no-irregular-whitespace': 'off',
        'perfectionist/sort-exports': 'off',
        'perfectionist/sort-imports': 'off',
        'regexp/no-legacy-features': 'off',
        'regexp/no-missing-g-flag': 'off',
        'regexp/no-useless-dollar-replacements': 'off',
        'regexp/no-useless-flag': 'off',
        'style/indent': 'off',
      },
    },
    {
      files: [
        GLOB_MARKDOWN_CODE,
        ...componentExts.map(ext => `${GLOB_MARKDOWN}/**/*.${ext}`),
      ],
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            impliedStrict: true,
          },
        },
      },
      name: 'jhqn/markdown/disables/code',
      rules: {
        'import/newline-after-import': 'off',

        'no-alert': 'off',
        'no-console': 'off',
        'no-labels': 'off',
        'no-lone-blocks': 'off',
        'no-restricted-syntax': 'off',
        'no-undef': 'off',
        'no-unused-expressions': 'off',
        'no-unused-labels': 'off',
        'no-unused-vars': 'off',

        'node/prefer-global/process': 'off',
        'style/comma-dangle': 'off',

        'style/eol-last': 'off',
        'ts/consistent-type-imports': 'off',
        'ts/explicit-function-return-type': 'off',
        'ts/no-namespace': 'off',
        'ts/no-redeclare': 'off',
        'ts/no-require-imports': 'off',
        'ts/no-unused-expressions': 'off',
        'ts/no-unused-vars': 'off',
        'ts/no-use-before-define': 'off',

        'unicode-bom': 'off',
        'unused-imports/no-unused-imports': 'off',
        'unused-imports/no-unused-vars': 'off',

        ...overrides,
      },
    },
  ]
}
