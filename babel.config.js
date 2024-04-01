module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.android.ts',
          '.android.tsx',
          '.ios.ts',
          '.ios.tsx',
          '.js',
          '.json',
          '.jsx',
          '.ts',
          '.tsx',
        ],
      },
    ],
  ],
};
