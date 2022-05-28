module.exports = {
  extends: [
    '@jhqn/eslint-config-react',
    '@jhqn/eslint-config-vue',
  ],
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'react-hooks/rules-of-hooks': 'off',
        'react-hooks/exhaustive-deps': 'off',
      },
    },
  ],
}
