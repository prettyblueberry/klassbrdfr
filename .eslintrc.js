module.exports = {
  parser: 'babel-eslint',
  env: {
    'browser': true,
    'node': true,
    'es6': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  plugins: [
    'babel'
  ],
  settings: {
    react: {
      'createClass': 'createReactClass',
      'pragma': 'React',
      'version': 'detect',
    }
  },
  rules: {
    "react/prop-types": 0,
    "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
  },
  globals: {

  }
}
