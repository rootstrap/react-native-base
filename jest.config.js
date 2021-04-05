module.exports =  {
    preset: "react-native",
    transform: {
      "^.+\\.tsx?$": "ts-jest",
      "^.+\\.(js|jsx)$": "babel-jest",
      "node_modules/variables/.+\\.(j|t)sx?$": "babel-jest"
    },
    testRegex: "(/src/.*\\.(test|spec))\\.(jsx?|tsx?|ts|js)$",
    transformIgnorePatterns: [
      "node_modules/(?!(jest-)?react-native|react-(native|universal|navigation)-(.*)|@react-native-community/(.*)|@react-navigation/(.*)|bs-platform|@rootstrap/redux-tools)"
    ],
    setupFiles: [
      "./tests/__mocks__/index.js",
      "<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js"
    ],
    moduleFileExtensions: [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
    ]
  }