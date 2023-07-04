module.exports = {
  extends: ['plugin:@unocss/recommended', require.resolve('./base')],
  rules: {
    // unocss
    '@unocss/order-attributify': 'off',
  },
}
