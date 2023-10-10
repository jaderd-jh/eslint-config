const ts = require('@jhqn/eslint-config-ts')

module.exports = {
  env: {
    /**
     * https://eslint.vuejs.org/user-guide/#faq
     * https://github.com/vuejs/eslint-plugin-vue/commit/44ff0e02cd0fd08b8cd7dee0127dbb5590446323#diff-538534b7c3f8223e82fa7d350af47f9d66c9ec7355dc567a22b54e5829e09703
     */
    'vue/setup-compiler-macros': true,
  },
  parserOptions: {
    parser: require.resolve('@typescript-eslint/parser'),
    extraFileExtensions: ['.vue'],
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: ['plugin:vue/vue3-recommended', '@jhqn/eslint-config-ts', 'plugin:prettier-vue/recommended'],
  rules: {
    '@typescript-eslint/no-var-requires': 'off',
    'no-unused-expressions': ['error', { allowShortCircuit: true }],
    '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true }],

    'vue/attributes-order': ['error', { alphabetical: true }],
    'vue/order-in-components': ['error'],
    // 闭合标签配置
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/max-attributes-per-line': 'off',
    'vue/no-v-html': 'off',
    'vue/require-prop-types': 'off',
    'vue/require-default-prop': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/prefer-import-from-vue': 'off',

    // reactivity transform
    'vue/no-setup-props-destructure': 'off',

    'vue/component-tags-order': ['error', { order: ['script', 'template', 'style'] }],
    'vue/block-tag-newline': ['error', { singleline: 'always', multiline: 'always' }],
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        registeredComponentsOnly: false,
        /**
         * 允许使用 kebab-case 命名方式 的组件库 vant | element-plus
         */
        ignores: ['/^van-/', '/^el-/', 'component', 'slot'],
      },
    ],
    'vue/component-options-name-casing': ['error', 'PascalCase'],
    'vue/custom-event-name-casing': ['error', 'camelCase'],
    'vue/define-macros-order': ['error', { order: ['defineOptions', 'defineProps', 'defineEmits', 'defineSlots'] }],
    'vue/html-comment-content-spacing': ['error', 'always', { exceptions: ['-'] }],
    'vue/no-restricted-v-bind': ['error', '/^v-/'],
    'vue/no-useless-v-bind': 'error',
    'vue/no-v-text-v-html-on-component': 'error',
    'vue/padding-line-between-blocks': ['error', 'always'],
    'vue/prefer-separate-static-class': 'error',

    // extensions
    'vue/array-bracket-spacing': ['error', 'never'],
    'vue/arrow-spacing': ['error', { before: true, after: true }],
    'vue/block-spacing': ['error', 'always'],
    'vue/comma-spacing': ['error', { before: false, after: true }],
    'vue/comma-style': ['error', 'last'],
    'vue/dot-location': ['error', 'property'],
    'vue/dot-notation': ['error', { allowKeywords: true }],
    'vue/eqeqeq': ['error', 'smart'],
    // 'vue/func-call-spacing': ['off', 'never'],
    'vue/key-spacing': ['error', { beforeColon: false, afterColon: true }],
    'vue/keyword-spacing': ['error', { before: true, after: true }],
    'vue/no-constant-condition': 'warn',
    'vue/no-empty-pattern': 'error',
    'vue/no-extra-parens': ['error', 'functions'],
    'vue/no-irregular-whitespace': 'error',
    'vue/no-loss-of-precision': 'error',
    'vue/no-restricted-syntax': ['error', 'DebuggerStatement', 'LabeledStatement', 'WithStatement'],
    'vue/no-sparse-arrays': 'error',
    'vue/object-curly-newline': ['error', { multiline: true, consistent: true }],
    'vue/object-curly-spacing': ['error', 'always'],
    'vue/object-property-newline': ['error', { allowMultiplePropertiesPerLine: true }],
    'vue/object-shorthand': ['error', 'always', { ignoreConstructors: false, avoidQuotes: true }],
    'vue/prefer-template': 'error',
    'vue/quote-props': ['error', 'consistent-as-needed'],
    'vue/space-in-parens': ['error', 'never'],
    'vue/space-infix-ops': 'error',
    'vue/space-unary-ops': ['error', { words: true, nonwords: false }],
    'vue/template-curly-spacing': 'error',
    'vue/next-tick-style': ['error', 'promise'],
    'vue/no-reserved-component-names': [
      'error',
      {
        disallowVueBuiltInComponents: true,
        disallowVue3BuiltInComponents: true,
      },
    ],
    'vue/no-mutating-props': ['error', { shallowOnly: true }],

    // prettier
    'prettier/prettier': 'off',
    'prettier-vue/prettier': [
      'error',
      {
        // Override all options of `prettier` here
        // @see https://prettier.io/docs/en/options.html
        printWidth: 120,
        arrowParens: 'avoid',
        quoteProps: 'consistent',
        endOfLine: 'lf',
        semi: false,
        singleQuote: true,
        trailingComma: 'es5',
        useTabs: false,
        vueIndentScriptAndStyle: true,
      },
    ],
  },
  overrides: [
    ...ts.overrides,
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
      rules: {
        'no-unused-vars': ['error', { varsIgnorePattern: '.*', args: 'none' }],
        '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '.*', args: 'none' }],
        'no-undef': 'off',
        '@typescript-eslint/no-undef': 'off',
        'indent': 'off',
        '@typescript-eslint/indent': 'off',
      },
    },
  ],
  settings: {
    'prettier-vue': {
      SFCBlocks: {
        style: false,
      },
    },
  },
}
