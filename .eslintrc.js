module.exports = {
  settings: {
    'import/resolver': {
      node: {
        paths: [
          '.',
        ],
        extensions: [
          '.js',
          '.jsx',
        ],
      },
    },
  },
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'react-app',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'comma-dangle': 'error',
    'jsx-a11y/anchor-is-valid': 'off',
    'max-len': 'off',
    'no-console': 'off',
    'no-plusplus': 'off',
    'react/forbid-prop-types': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'react/prop-types': 'off',
    'prefer-destructuring': 'warn',
    'import/prefer-default-export': 'off',
    'import/no-named-as-default': 'off',
  },
};
