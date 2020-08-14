module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: ['airbnb-base'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
      },
    ],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts'],
      },
    },
  },
};
