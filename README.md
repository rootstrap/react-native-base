# React Native Base

[![CircleCI](https://circleci.com/gh/rootstrap/react-native-base.svg?style=shield)](https://circleci.com/gh/rootstrap/react-native-base)
[![Maintainability](https://api.codeclimate.com/v1/badges/8bb29bcea21bb5dda316/maintainability)](https://codeclimate.com/github/rootstrap/react-native-base/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/8bb29bcea21bb5dda316/test_coverage)](https://codeclimate.com/github/rootstrap/react-native-base/test_coverage)
## Commands
1. **Start the app**. `yarn start`
2. **Lint the app**. `yarn lint`
3. **Test the app**. `yarn test`

## Getting started
1. Install dependencies: `yarn`
2. Create a file named `.env` in the root directory of the project and define your config constants there, for example:
```
API_URL=https://rails5-api-base.herokuapp.com/api/v1
SOME_OTHER_CONFIG=something
```
3. Rename your new project using react-native-rename (https://github.com/junedomingo/react-native-rename)
4. Start on android or ios: `react-native run-android` or `react-native run-ios`

## Build Android Release
1. Ask a developer for the release key and place it in `/android/app`
2. Add the following variables in .env: RELEASE_STORE_FILE, RELEASE_STORE_PASSWORD, RELEASE_KEY_ALIAS, RELEASE_KEY_PASSWORD
3. Run `cd android && ./gradlew assembleRelease`
4. The generated APK can be found under `android/app/build/outputs/apk/app-release.apk`

## Configuring Code Climate
1. After adding the project to CC, go to `Repo Settings`
2. On the `Test Coverage` tab, copy the `Test Reporter ID`
3. Replace the current value of `CC_TEST_REPORTER_ID` on the `config.yml file (.circleci/config.yml)` with the one you copied from CC

## Troubleshooting

### iOS not building on Xcode 10

https://github.com/rootstrap/react-native-base/issues/40
