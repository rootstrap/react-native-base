# React Native Base - TypeScript

## Commands

1. **Start the app**: `yarn android:{env}` or `yarn ios:{env}` (envs: `dev`, `staging`, and `prod`)
2. **Start metro bundler**: `yarn start`
3. **Lint the app**: `yarn lint`
4. **Test the app**: `yarn test`

## Getting started

1. Install dependencies: `yarn`
2. Create a `.env` file in the root directory of the project, based on the `.env.defaults` sample file and the extra constants that you may need. This will be your development env.

You can also create `.env.prod` and `.env.staging` to define environment variables for production and staging.

3. Rename your new project using `yarn rename`
4. Start on android or ios: `yarn android:{env}` or `yarn ios:{env}` (envs: `dev`, `staging`, and `prod`)

### Steps for Android development

None

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

## Build Android Release

### Configuration

🚧 UNDER CONSTRUCTION 🚧

### Create release

🚧 UNDER CONSTRUCTION 🚧

## Build iOS Release

1. Make sure that the version was already bumped if it applies.
2. Select on Xcode the scheme of the env you want to create the release for.
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

#### Using different schemes

You can use schemes to configure different app-icons, splash, bundle-ids, etc.

Schemes are a great way to manage multiple envs in TestFlight.

Fortunately the base already comes with the schemes you will probably need to get to production: `ReactNativeBase-Develop`, `ReactNativeBase-Staging` and `ReactNativeBase` which is for production use.

Each build target has its respective scheme already set up, they all have the same name as the build target except for the production one, that one is called `ReactNativeBase-Prod`. This leaves `ReactNativeBase` scheme free of an env setup just in case you don't want to use build targets.

To add a new build target do as follows:

🚧 UNDER CONSTRUCTION 🚧

#### Manually set the env file

If you are looking for something quick and easy in the short term, there is one more way you can run the app with a custom env file, just run:

```
  ENVFILE=.env.{env} react-native run-ios
```

## Base dependencies

- [React-Navigation](https://reactnavigation.org)
- [Jest](https://github.com/facebook/jest)
- [React-Query](https://tanstack.com/query/v4/?from=reactQueryV3&original=https://react-query-v3.tanstack.com/)

### Adding a Splash Screen

The package used to add the splash screen functionality was [react-native-bootsplash](https://github.com/zoontek/react-native-bootsplash) and uses placeholder images.
