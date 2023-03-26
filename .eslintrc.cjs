module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'jest'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  env: {
    jest: true,
  },
  rules: {
    'no-console': 'off',
    'no-constant-condition': [
      'error',
      {
        checkLoops: false,
      },
    ],
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
  },
};
