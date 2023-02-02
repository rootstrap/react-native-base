# React Native Base - TypeScript

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

You can also create `.env.prod`, `.env.staging`, and `.env.qa` to define environment variables for production and staging.

1. Rename your new project using `yarn rename` or `npm run rename`
2. Start on android or ios: `yarn android:{env}` or `yarn ios:{env}` (envs: `dev`,`qa`, `staging`, and `prod`)

### Steps for Android development

None

### Steps for iOS development

1. Run the following command to install iOS pods

```
npx pod-install
```

## Continuous Integration

The repo includes configuration for using GitHub Actions to run unit tests and code analysis: `.github/workflows/test.yml`. This can be adapted as needed for specifics of each project. Both CodeClimate and Sonarqube integrations are included in the workflow and their required environment settings should be retrieved from the repo Secrets.

## Using folders template

There's a folder named .fttemplates where you'll find a template you can use to create new components for your app, keeping the same folder conventions for all your components. 

You must install Folder Templates extensions in Visual Studio Code to use this feature. You'll find it [here](https://marketplace.visualstudio.com/items?itemName=Huuums.vscode-fast-folder-structure).

If you install the extension you can create your components folder using the template by clicking on Create new templated folder button in the context menu.


https://user-images.githubusercontent.com/11773865/216385411-9e152929-e6f7-41a2-a22c-5312509acbd4.mov




## Configuring Code Climate

1. After adding the project to CC, go to `Repo Settings`
2. On the `Test Coverage` tab, copy the `Test Reporter ID`
3. Set the copied value as environment variable `CC_TEST_REPORTER_ID` (and repo Secrets)

## Sonarqube Integration

1. Log into Sonarqube console (`SONAR_URL`) and create a new Project key(`SONAR_PROJECT`)
2. Generate a token for the new project and copy it
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
  -Dsonar.coverage.exclusions=**/spec.js,**/__mocks__/**,**/**.spec.js,**/**.config.js,**/rnbv.js,**/android/**,**/ios/**,**/**.styles.js,**/tests/**,**/__mocks__/**,**/httpClient/**,**/jest-setup.js,**/constants/**,**/assets/**,**/node_modules/**,**/coverage/**
```

## Build Android Release

### Configuration

🚧 UNDER CONSTRUCTION 🚧

### Create release

🚧 UNDER CONSTRUCTION 🚧

## Build iOS Release

1. Make sure that the version was already bumped if it applies if not you can run the version bump script with `npm run bump` or `yarn bump`.
2. Select on Xcode the scheme of the env you want to create the release for.
3. For the device select **generic iOS device**.
4. Then go to **Product** -> **Archive**.
5. After it is done processing and the archive succeeds the **organizer** will open. Here is where you can see all the previously generated archives.
6. The last step is to upload it to the App Store from there or release it Ad Hoc style.

## Managing multiple environments

The base is already equipped with three main environments: `dev`, `qa`, `staging`, `production`. All the env files you need to provide are as follows: `.env`, `.env.qa`, `.env.staging`, and `.env.prod`.

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
5. In that new folder you will see a folder called `values` and inside a file called `strings.xml`. There you can set the app name that is going to appear for this flavor. You can also set special app icons for each flavor inside `res` folder.
6. (optional) go ahead and add new scripts in the `package.json` file for this new env. As you can see, the other envs already have scripts to run, build and build release. This will make your development workflow a lot easier.
7. you might need to open the android folder in Android Studio and do **File** -> **Sync project with grade files**
8. Last but not least, make sure that you add the new environment to the `bump` script at

#### Manually set the env file

If you are looking for something quick and easy in the short term, there is one more way you can run the app with a custom env file, just run:

```
  ENVFILE=.env.{env} react-native run-android
```

### iOS

#### Using different schemes

You can use schemes to configure different app-icons, splash, bundle-ids, etc.

Schemes are a great way to manage multiple envs in TestFlight.

Fortunately the base already comes with the schemes you will probably need to get to production: `ReactNativeBase-Develop`, `ReactNativeBase-QA`, `ReactNativeBase-Staging` and `ReactNativeBase` which is for production use.

Each build target has its respective scheme already set up, they all have the same name as the build target except for the production one, that one is called `ReactNativeBase-Prod`. This leaves `ReactNativeBase` scheme free of an env setup just in case you don't want to use build targets.

To add a new build target do as follows:

🚧 UNDER CONSTRUCTION 🚧

#### Manually set the env file

If you are looking for something quick and easy in the short term, there is one more way you can run the app with a custom env file, just run:

```
  ENVFILE=.env.{env} react-native run-ios
```

### Adding App Icons for each env

#### iOS

Open the project with XCode and in the files tree find `ReactNativeBase/ReactNativeBase/Images.xcassets` file. There you can find a different App Icon file for each environment, and you can modify each with your own icons.

#### Android

Open the project with Android Studio. Under `android/app/src` you will find a folder for each environment. Each one contains the app icon in square and round version in different sizes. You can change these png files in all sizes to use your own app icon.

## Base dependencies

- [React-Navigation](https://reactnavigation.org)
- [Jest](https://github.com/facebook/jest)
- [React-Query](https://tanstack.com/query/v4/?from=reactQueryV3&original=https://react-query-v3.tanstack.com/)

### Adding a Splash Screen

The package used to add the splash screen functionality was [react-native-bootsplash](https://github.com/zoontek/react-native-bootsplash) and uses placeholder images.
