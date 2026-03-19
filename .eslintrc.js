module.exports = {
  root: true,
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  settings: {
    'import/resolver': {
      'babel-module': {
        alias: { '@': './src' },
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
  },
  rules: {
    // Already disabled per CLAUDE.md
    'react/react-in-jsx-scope': 'off',
    'import/extensions': 'off',

    // TypeScript handles prop types
    'react/prop-types': 'off',

    // no-use-before-define conflicts with styles-at-bottom pattern
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',

    // Allow JSX in .tsx files
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],

    // Too strict for RN — mixed text+expressions are common
    'react/jsx-one-expression-per-line': 'off',

    // Inline handlers are unavoidable in simple RN components
    'react/jsx-no-bind': 'off',

    // FlatList renderItem typing causes false positives
    'react/no-unused-prop-types': 'off',

    // StatusBar style is a string in Expo, not an object
    'react/style-prop-object': 'off',

    // Named exports are fine
    'import/prefer-default-export': 'off',
  },
  ignorePatterns: ['node_modules/', 'babel.config.js'],
};
