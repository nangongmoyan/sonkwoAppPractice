module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './src/components',
          '@containers': './src/containers',
          '@actions': './src/actions',
          '@reducers': './src/reducers',
          '@util': './src/util',
          '@models': './src/models',
          '@router': './src/router',
          '@service': './src/service',
          '@ui': './src/ui',
          '@features': './src/features',
          '@source': './src/source',
          // '@images': './src/source/images',
          '@contexts': './src/contexts',
          '@native': './src/native',
          '@hooks': './src/hooks',
          '@pages': './src/pages',
        },
      },
    ],
  ],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
}
