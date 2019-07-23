module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          actions: './src/actions',
          api: './src/api',
          components: './src/components',
          constants: './src/constants',
          containers: './src/containers',
          hooks: './src/hooks',
          locale: './src/locale',
          reducers: './src/reducers',
          screens: './src/screens',
          selectors: './src/selectors',
          store: './src/store',
          utils: './src/utils',
        },
      },
    ],
  ],
};
