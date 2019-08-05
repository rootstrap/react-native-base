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
2. Create a `.env` file in the root directory of the project, based on the `.env.defaults` sample file and the extra constants that you may need.

You can also create `.env.prod` and `.env.staging` to define environment variables for production and staging.

3. Rename your new project using [react-native-rename](https://github.com/junedomingo/react-native-rename)
4. Start on android or ios: `react-native run-android` or `react-native run-ios`

## Configuring Code Climate
1. After adding the project to CC, go to `Repo Settings`
2. On the `Test Coverage` tab, copy the `Test Reporter ID`
3. Replace the current value of `CC_TEST_REPORTER_ID` on the `config.yml file (.circleci/config.yml)` with the one you copied from CC

## Build Android Release
1. Ask a developer for the release key and place it in `/android/app`
2. Add the following variables in `.env.prod`:
 ```
  RELEASE_STORE_FILE
  RELEASE_STORE_PASSWORD
  RELEASE_KEY_ALIAS
  RELEASE_KEY_PASSWORD
  ```
3. Run `cd android && ./gradlew assembleRelease`
4. The generated APK can be found under `android/app/build/outputs/apk/app-release.apk`

## Build iOS Release
1. Configure the release scheme: go to **Product** -> **Scheme** -> **Edit Scheme**, then select the Run tab in the sidebar, and set the Build Configuration dropdown to **Release**.

## Managing multiple environments

### Android

By default the app loads `.env`, `.env.staging` or `.env.prod` files depending on the mode the build was executed (`debug`, `staging` or `release` respectively)

### iOS

#### Using schemas
You can add an schema in XCode and indicate which `.env` file to load there or doing it manually from the console by running

```
  ENVFILE=.env.staging react-native run-ios
```

#### Using different build targets
You can use build targets to configure different app-icons, splash, bundle-ids, etc. By default, `Staging` and `Develop` are already set up, just select the target's scheme that you want to build.

- `Staging` and `Develop` targets search for `.env.staging` and `.env.develop` automatically (if the file it's not present, it will raise a build error). If you want to change the name of the file, go to `Edit Scheme -> Build -> Pre actions -> edit the name on the shell script`.

- `npm run ios:staging` and `npm run ios:develop` are available if you want to run the targets from the CLI.

## Troubleshooting

### iOS not building on Xcode 10

https://github.com/rootstrap/react-native-base/issues/40

## Base dependencies
- [React-Native-Navigation](https://github.com/wix/react-native-navigation)
- [PropTypes](https://github.com/facebook/prop-types)
- [React-Native-Config](https://github.com/luggit/react-native-config)
- [React-Native-i18n](https://github.com/AlexanderZaytsev/react-native-i18n)
- [Redux](https://github.com/reduxjs/redux)
- [Redux-Thunk](https://github.com/reduxjs/redux-thunk)
- [Redux-Form](https://github.com/erikras/redux-form)
- [Redux-React-Native-Session](https://github.com/bernabe9/redux-react-native-session)
- [Reselect](https://github.com/reduxjs/reselect)
- [humps](https://github.com/domchristie/humps)
- [validate.js](https://github.com/ansman/validate.js)
- [immer](https://github.com/immerjs/immer)
- [lodash](https://github.com/lodash/lodash)
- [Jest](https://github.com/facebook/jest)
- [Enzyme](https://github.com/airbnb/enzyme)
