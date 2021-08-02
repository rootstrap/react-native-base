
## Prerequisites

- Setup your Android development environment:
- Install Yarn package manager: https://classic.yarnpkg.com/en/docs/install/#mac-stable
- Sign up on IEX Cloud and retrieve an API token: https://iexcloud.io/docs/api/
- If using a physical Android device, enable developer options: https://reactnative.dev/docs/running-on-device


## Getting started

> The following steps will enable you to run a development build of the app, on your Android device or device AVD.

1. Install dependencies: `yarn`
2. Create an adroid debug keystore, run the following command inside the `android/app` directory:

```Bash
keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000
```

3. Create a `.env.dev` file in the root directory of the project, based on the `.env.defaults` sample file and the extra constants that you may need. This will be your development env. Replace with your IEX API token and Android keystore information created in the _Prerequisites_ section.

```Bash
IEX_URL=https://cloud.iexapis.com/stable
IEX_TOKEN=<YOUR_IEX_CLOUD_TOKEN>
RELEASE_STORE_FILE=<YOUR_DEBUG_KEY.keystore>
RELEASE_KEY_ALIAS=<RELEASE_KEYSTORE_NAME>
RELEASE_STORE_PASSWORD=<RELEASE_STORE_PASSWORD>
RELEASE_KEY_PASSWORD=<KEY_STORE_PASSWORD>
```
4. Connect an Android device or Emulator `adb devices`
5. Start on android: `yarn run android:dev`
