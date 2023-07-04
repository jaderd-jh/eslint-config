module.exports = {
  extends: [require.resolve('./base'), 'plugin:@unocss/recommended'],
  rules: {
    // unocss
    '@unocss/order-attributify': 'off',
  },
}
