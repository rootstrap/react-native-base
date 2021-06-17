module.exports = {
  preset: 'react-native',
  setupFiles: [
    './tests/__mocks__/index.js',
    '<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js',
  ],
  setupFilesAfterEnv: ['<rootDir>/tests/setup-tests.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?(@react-native|react-native)|react-(native|universal|navigation)-(.*)|@react-native-community/(.*)|@react-navigation/(.*)|bs-platform|@rootstrap/redux-tools)',
  ],
};
