# React Native Base

![GHA CI Test](https://github.com/rootstrap/react-native-base/workflows/CI%20Test/badge.svg)
[![Maintainability](https://api.codeclimate.com/v1/badges/8bb29bcea21bb5dda316/maintainability)](https://codeclimate.com/github/rootstrap/react-native-base/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/8bb29bcea21bb5dda316/test_coverage)](https://codeclimate.com/github/rootstrap/react-native-base/test_coverage)

## Commands

1. **Start the app**: `yarn android:{env}` or `yarn ios:{env}` (envs: `dev`, `staging`, and `prod`)
2. **Start metro bundler**: `yarn start`
3. **Lint the app**: `yarn lint`
4. **Test the app**: `yarn test`

## Getting started

1. Install dependencies: `yarn`
2. Create a `.env` file in the root directory of the project, based on the `.env.defaults` sample file and the extra constants that you may need. This will be your development env.

You can also create `.env.prod` and `.env.staging` to define environment variables for production and staging.

3. Rename your new project using [react-native-rename](https://github.com/junedomingo/react-native-rename). You will also need to rename other files manually.
   Look for `develop` and `staging`'s schemes and `{BuildTarged}-Info.plist`s. You will also need to look for the following patterns inside your project files: `ReactNativeBase`, `react-native-base`, `reactnativebase`, `RNBase`.
   Replace them to your corresponding project name (following each corresponding naming convention).
   **Important**
   When looking for the patterns remember to have the `matching case` option enabled and remember to also check for these patterns in your file names.

4. Start on android or ios: `yarn android:{env}` or `yarn ios:{env}` (envs: `dev`, `staging`, and `prod`)

If you don't want to make use of the Android Flavors and iOS Build Targets then you can run these commands instead:

**For develop**

```
react-native run-android
react-native run-ios
```

**For other envs**

```
ENVFILE=.env.{env} react-native run-ios
```

### Steps for Android development

1. Run the following command inside the `android/app` directory

```
keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000
```
**NOTE:** In case you face this issue **Algorithm HmacPBESHA256 not available** you could use this command instead. (This happens if the machine doesn't have **Java 8** as main when trying to run the keytool command.)
```
**curl** https://raw.githubusercontent.com/facebook/react-native/master/template/android/app/debug.keystore > android/app/debug.keystore
```

### Steps for iOS development

1. Run the following command inside the `ios` directory

```
pod install
```

## Continuous Integration

The repo includes configuration for using GitHub Actions to run unit tests and code analysis: `.github/workflows/test.yml`. This can be adapted as needed for specifics of each project. Both CodeClimate and Sonarqube integrations are included in the workflow and their required environment settings should be retrieved from the repo Secrets.

## Configuring Code Climate

1. After adding the project to CC, go to `Repo Settings`
2. On the `Test Coverage` tab, copy the `Test Reporter ID`
3. Set the copied value as environment variable `CC_TEST_REPORTER_ID` (and repo Secrets)

## Sonarqube Integration

1. Log into Sonarqube console (`SONAR_URL`) and create new Project key(`SONAR_PROJECT`)
2. Generate a token for the new project and copy
3. Set the token value as environment variable `SONAR_TOKEN`

### Usage

```
sonar-scanner \
  -Dsonar.qualitygate.wait=true \
  -Dsonar.host.url=$SONAR_URL \
  -Dsonar.login=$SONAR_TOKEN \
  -Dsonar.projectKey=$SONAR_PROJECT \
  -Dsonar.scm.provider=git \
  -Dsonar.java.binaries=/tmp \
  -Dsonar.nodejs.executable=$(which node) \
  -Dsonar.projectVersion=$(echo $GITHUB_SHA | cut -c1-8) \
  -Dsonar.sources=. \
  -Dsonar.projectBaseDir=. \
  -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info
```

## Bump the app version

We have a nifty script that bumps the app version for you!

If it's your first time using it please check that the `rnbv.config.js` is correctly configured, if in doubt you can refer to the [original file](https://github.com/rootstrap/react-native-base/blob/master/rnbv.config.js) at the `react-native-base` repo.
The iosPaths should match the envs of your repo. This should have already been changed in the rename project steps.

To run the script use the following command:

```
yarn bump
```

You should see something as follows:

![bump options](https://user-images.githubusercontent.com/9297073/108426679-cc770380-721a-11eb-9a3c-f42a6248648c.png)

Follow the instructions in the prompt to select the version bump that you want and press enter to run it.

As a result you should see something like this (example is minor bump):
![bump results](https://user-images.githubusercontent.com/9297073/108426803-fb8d7500-721a-11eb-985d-edf56e07da5b.png)

## Build Android Release

### Configuration

1. Make sure that the version was already bumped if it applies. You might want to check the [bump the app version](#bump-the-app-version) section
2. Ask a developer for the release key and place it in `/android/app`
3. Add the following variables in `.env.prod`:

```
 RELEASE_STORE_FILE
 RELEASE_STORE_PASSWORD
 RELEASE_KEY_ALIAS
 RELEASE_KEY_PASSWORD
```

### Create release

1. Run `yarn android:release:{env}`
2. The generated APK can be found under `android/app/build/outputs/apk/{env}/app-release.apk`

## Build iOS Release

1. Make sure that the version was already bumped if it applies. You might want to check the [bump the app version](#bump-the-app-version) section
2. Select on Xcode the scheme of the build target you want to create the release for.
3. For the device select **generic iOS device**.
4. Then go to **Product** -> **Archive**.
5. After it is done processing and the archive succeeds the **organizer** will open. Here is where you can see all the previously generated archives.

## Managing multiple environments

The base is already equipped with three main environments: `dev`, `staging`, `production`. All the env files you need to provide are as follows: `.env`, `.env.staging`, and `.env.prod`.

If you want to add a new env here are the steps to follow:

1. Create a new env file with the format `.env.{name}`.

### Android

2. go to `android/app/build.gradle` and add the env file association to `project.ext.envConfigFiles` following the existing ones as example.
3. Scroll down to the `flavors` section and add a new flavor with the following format:

```
{name} {
  applicationIdSuffix '.{name}'
  minSdkVersion rootProject.ext.minSdkVersion
  targetSdkVersion rootProject.ext.targetSdkVersion
}
```

4. Inside `android/app/src` copy one of the existing env folders like `staging` and rename it with the name of your new flavor.
5. In that new folder you will see a folder called `values` and inside a file called `strings.xml` there you can set the app name that is going to appear for this flavor. You can also set special app icons for each flavor inside `res` folder.
6. (optional) go ahead and add new scripts in the `package.json` file for this new env. As you can see, the other envs already have scripts to run, build and build release, this will make your development workflow a lot easier.
7. you might need to open the android folder in Android Studio and do **File** -> **Sync project with grade files**

#### Manually set the env file

If you are looking for something quick and easy in the short term, there is one more way you can run the app with a custom env file, just run:

```
  ENVFILE=.env.{env} react-native run-android
```

### iOS

#### Using different build targets

You can use build targets to configure different app-icons, splash, bundle-ids, etc.

Build targets are a great way to manage multiple envs in TestFlight. When you have staging and production builds that need testing by the client in TestFlight and you are not using build target this can become a bit of an issue.

Fortunately the base already comes with the build targets you will probably need to get to production: `ReactNativeBase-Develop`, `ReactNativeBase-Staging` and `ReactNativeBase` which is for production use.

Each build target has its respective scheme already set up, they all have the same name as the build target except for the production one, that one is called `ReactNativeBase-Prod`. This leaves `ReactNativeBase` scheme free of an env setup just in case you don't want to use build targets.

To add a new build target do as follows:

2. Open XCode and go to the project settings, there you should see a list of the already created targets.
3. Right click in the `ReactNativeBase` build target (or your app's name if you have already renamed it) and select duplicate.
4. Select duplicate only.
5. Rename the new build target appropriately.
6. At the root of the `ios` folder a new copy of the info.plist file will be created. You also need to rename that file appropriately.
7. Since you have renamed the new build target's info.plist file, you need to go to the **Build Settings** of the new build target and in **Packaging** rewire the info.plist File attribute with the file's new name.
8. A new scheme will also be created, rename it appropriately.
9. Go to edit the scheme and in the left side bar select **Build** -> **Pre-actions**. Select the plus button and **New run script action**. In the code section of the action put as follows: `echo ".env.{name}" > /tmp/envfile` where name is the name of the env you created.
10. Add the new build target to your pod file:

```
target '{TargetName}' do
  base_pods


  use_native_modules!
end
```

11. (optional) If you are using Fastlane, copy Fastlane's config from one of the other build targets and rename in the appropriate places, the files you need to look into are `ios/Fastfile` and `ios/Appfile`.

- `Staging` and `Develop` targets search for `.env.staging` and `.env` automatically (if the file it's not present, it will raise a build error).

- `npm run ios:staging` and `npm run ios:develop` are available if you want to run the targets from the CLI.

#### Using schemas

If you don't want to use Build Targets, you have the option to just create new schemes for the base build target.

Create a new scheme and follow the step number **9** and **11** of **Using different build targets**.

#### Manually set the env file

If you are looking for something quick and easy in the short term, there is one more way you can run the app with a custom env file, just run:

```
  ENVFILE=.env.{env} react-native run-ios
```


## Automation with Fastlane and GitHub Actions

This project provides configuration for automatic build and release using [Fastlane]((https://fastlane.tools)).
For more details please check configuration and Readme files for [iOS](./ios/fastlane/README.md) and [Android](android/fastlane/README.md)


Builds can be automatically triggered by [GitHub Actions](https://github.com/features/actions) upon pushes or PRs to specific branches. In `.github/workflows/builds.yml` we have an example that runs the build for the Dev targets in an ubuntu cloud runner (Android) and a self-hosted runner on a macmini (***NOTE***: this will not work for repos outside of Rootstrap's org). 

Both the Fastlane and GHA configuration should be adapted to fit each specific project.

## Troubleshooting

### iOS not building on Xcode 10

https://github.com/rootstrap/react-native-base/issues/40

## Base dependencies

- [React-Navigation](https://reactnavigation.org)
- [PropTypes](https://github.com/facebook/prop-types)
- [React-Native-Config](https://github.com/luggit/react-native-config)
- [ReactNativeLocalization](https://github.com/stefalda/ReactNativeLocalization)
- [Redux](https://github.com/reduxjs/redux)
- [Redux-Thunk](https://github.com/reduxjs/redux-thunk)
- [Redux-Persist](https://github.com/rt2zz/redux-persist)
- [humps](https://github.com/domchristie/humps)
- [validate.js](https://github.com/ansman/validate.js)
- [immer](https://github.com/immerjs/immer)
- [lodash](https://github.com/lodash/lodash)
- [Jest](https://github.com/facebook/jest)
- [Enzyme](https://github.com/airbnb/enzyme)
- [React-Native-Bootsplash](https://github.com/zoontek/react-native-bootsplash)

### Redux-Persist configuration

The current configuration for redux-persist is on `store/configureStore.js`.

The default configuration is the following:

- There's a defined `whitelist` where all reducers that want to be persisted must be declared.
- The `storage` engine is `AsyncStorage` but you can change it if needed, for example: https://github.com/CodingZeal/redux-persist-sensitive-storage if you need keychan storage on iOS.
- If you ever need to set up migrations to keep your reducers up to date, please check [this link](https://github.com/rt2zz/redux-persist#migrations).

### Adding a Splash Screen

The package used to add the splash screen functionality was [react-native-bootsplash](https://github.com/zoontek/react-native-bootsplash) and uses placeholder images.

#### Updating the images

The images must be replaced with the correct resolutions and sizes. This can be accomplished following [this guide](https://github.com/zoontek/react-native-bootsplash#assets-generation).
