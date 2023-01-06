const ts = require('@jhqn/eslint-config-ts')

module.exports = {
  extends: ['plugin:solid/typescript', '@jhqn/eslint-config-ts'],
  plugins: ['react', 'solid'],
  rules: {
    'solid/destructuring-assignment': 0,
    'solid/require-default-props': 0,
    'solid/prop-types': 0,
    'solid/forbid-prop-types': 0,
    'solid/sort-comp': 0,
    'solid/solid-in-jsx-scope': 0,
    'solid/no-unescaped-entities': 0,
    'solid/jsx-filename-extension': 0,
    'solid/jsx-fragments': 0,
    'solid/jsx-wrap-multilines': 0,
    'solid/jsx-no-undef': 0,
    'solid/jsx-one-expression-per-line': 0,
    'solid/jsx-closing-tag-location': 0,
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        shorthandFirst: true,
        shorthandLast: false,
        multiline: 'ignore',
        ignoreCase: true,
        noSortAlphabetically: false,
        reservedFirst: true,
        locale: 'auto',
      },
    ],
    'react/jsx-closing-bracket-location': [2, 'tag-aligned'],
    'react/jsx-curly-brace-presence': [2, { props: 'never', children: 'never' }],
    'react/jsx-first-prop-new-line': [2, 'multiline-multiprop'],
    'react/jsx-tag-spacing': [2, { beforeSelfClosing: 'always' }],
    'react/jsx-no-comment-textnodes': 2,
    'react/jsx-no-duplicate-props': 2,
    'react/jsx-no-target-blank': 2,
    'react/jsx-no-useless-fragment': [2, { allowExpressions: true }],
  },
  overrides: ts.overrides,
}
