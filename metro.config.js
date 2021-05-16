/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  transformer: {
    babelTransformerPath: require.resolve("./postcss-transformer.js"),
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
    getTransformModulePath() {
      return require.resolve('react-native-typescript-transformer');
    },
    getSourceExts() {
      return ['ts', 'tsx', 'js', 'jsx', "css", "pcss"];
    }
  },
};
