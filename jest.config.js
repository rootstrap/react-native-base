module.exports = {
  preset: '@testing-library/react-native',
  setupFiles: [
    '<rootDir>/node_modules/@testing-library/react-native/jest-preset.js',
    '<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js',
  ],
  setupFilesAfterEnv: [
    '<rootDir>/tests/setup-tests.js',
    '<rootDir>/node_modules/@testing-library/react-native/cleanup-after-each',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-(native|universal|navigation)-(.*)|@react-native-community/(.*)|@react-navigation/(.*)|bs-platform|@rootstrap/redux-tools)',
  ],
};
