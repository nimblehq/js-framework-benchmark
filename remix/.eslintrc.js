/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    '@nimblehq/eslint-config-nimble',
    'plugin:prettier/recommended',
    'prettier',
  ],
  rules: {
    'prettier/prettier': 'error',
  },
  ignorePatterns: ['tailwind.config.ts', 'remix.config.ts'],
};
