module.exports = {
  // Android build gradle path, you probably shouldn't be changing this
  androidPath: './android/app/build.gradle',
  iosPaths: {
    // List all envs with the paths to their respective Info.plist files
    dev: './ios/ReactNativeBase-Develop-Info.plist',
    staging: './ios/ReactNativeBase-Staging-Info.plist',
    prod: './ios/ReactNativeBase/Info.plist',
  },
};
