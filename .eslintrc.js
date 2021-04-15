module.exports = {
  'env': {
    browser: true,
    commonjs: true,
    es2021: true,
    jest: true,
    node: true,
  },
  'extends': ['mjrinker', 'mjrinker-react'],
  'parser': 'babel-eslint',
  'parserOptions': {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  'plugins': ['react', 'react-hooks'],
  'settings': { react: { version: 'detect' } },
};
