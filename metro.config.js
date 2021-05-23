/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
    getTransformModulePath() {
      return require.resolve("./custom-transformer.js");
    },
    getSourceExts() {
      return ['ts', 'tsx', 'js', 'jsx', "css", "pcss", "scss"];
    }
  },
};
