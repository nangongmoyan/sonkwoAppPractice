// react-native-community extends
// https://github.com/facebook/react-native/blob/master/packages/eslint-config-react-native-community/index.js
module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
    'import/ignore': ['node_modules/react-native/index\\.js$'],
  },
  rules: {
    curly: 'off',
    semi: 'off',
    radix: 'off',
    'react-native/no-inline-styles': 'off',
  },
  globals: {
    pushToast: 'readonly',
  },
};
