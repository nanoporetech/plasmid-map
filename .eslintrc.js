module.exports = {
  // root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // ecmaVersion: 2020,
    project: './tsconfig.json',
    // sourceType: 'module', // Allows for the use of imports
    // ecmaFeatures: {
    //   jsx: true, // Allows for the parsing of JSX
    // },
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    'plugin:@stencil/recommended',
  ],
  env: {
    browser: true,
    commonjs: true,
    node: true,
    mocha: true,
    es6: true,
  },
  rules: {
    camelcase: 'off',
    curly: [
      'error',
      'multi-line'
    ],
    indent: 'off',
    'prettier/prettier': 'error',
    '@typescript-eslint/no-extra-semi': 'error',
    '@typescript-eslint/semi': [
      'error',
    ],
    semi: 'off',
    '@stencil/required-jsdoc': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/class-name-casing': 'off',
    '@typescript-eslint/prefer-regexp-exec': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-misused-promises': ['error', { 'checksVoidReturn': false }],
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_', 'varsIgnorePattern': '[iI]gnored|^h$|^Host$|^Fragment$' }],
    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': [
      'warn',
      {
        'allowedNames': [
          'connectedCallback',
          'disconnectedCallback',
          'componentWillLoad',
          'componentDidLoad',
          'componentShouldUpdate',
          'componentWillRender',
          'render',
          'componentDidRender',
          'componentWillUpdate',
          'componentDidUpdate',
        ]
      }
    ]
  },
};
