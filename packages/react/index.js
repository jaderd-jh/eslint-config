module.exports = {
  extends: ['plugin:react/recommended', '@jhqn/eslint-config-ts'],
  plugins: ['react', 'react-hooks', 'mobx'],
  rules: {
    // jsx
    'jsx-quotes': ['error', 'prefer-double'],

    // mobx
    'mobx/missing-observer': 'off',

    // react
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks deps of Hooks
    'react/display-name': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/state-in-constructor': 'off',
    'react/static-property-placement': 'off',
    // Too restrictive:
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
    'react/destructuring-assignment': 'off',
    'react/jsx-filename-extension': 'off',
    'react/no-array-index-key': 'warn',
    'react/require-default-props': 'off',
    'react/jsx-fragments': 'off',
    'react/jsx-wrap-multilines': 'off',
    'react/prop-types': 'off',
    'react/forbid-prop-types': 'off',
    'react/sort-comp': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-no-undef': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/no-unescaped-entities': 'off',
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
    'react/jsx-closing-tag-location': 'off',
    'react/jsx-closing-bracket-location': ['error', 'tag-aligned'],
    'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
    'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
    'react/jsx-tag-spacing': ['error', { beforeSelfClosing: 'always' }],
  },
}
