// For React Native version 0.56 or later
var upstreamTransformer = require("metro/src/reactNativeTransformer");
var typescriptTransformer = require("react-native-typescript-transformer");
var postCssTransformer = require("./postcss-transformer.js");

module.exports.transform = function({ src, filename, options }) {
  if (filename.endsWith('.css') || filename.endsWith('.scss')) {
    return postCssTransformer.transform({ src, filename, options });
  } else if (filename.endsWith('.ts') || filename.endsWith('.tsx')) {
    return typescriptTransformer.transform({ src, filename, options });
  }
  return upstreamTransformer.transform({ src, filename, options });
};