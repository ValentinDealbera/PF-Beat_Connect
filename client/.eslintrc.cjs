module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  },
  env: {
    browser: true,
    es2021: true
  },
  plugins: ['prefer-arrow', '@typescript-eslint/eslint-plugin', 'prettier'],
  extends: ['standard-jsx', 'standard-with-typescript'],
  ignorePatterns: ['.eslintrc.cjs', 'node_modules/'],
  rules: {
    'arrow-body-style': 'error',
    'prefer-const': 'error',
    'no-var': 'error',
    'prefer-arrow-callback': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'prefer-arrow/prefer-arrow-functions': [
      'warn',
      {
        disallowPrototype: true,
        singleReturnOnly: false,
        classPropertiesAllowed: false
      }
    ],
    'multiline-ternary': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off'
  }
}
