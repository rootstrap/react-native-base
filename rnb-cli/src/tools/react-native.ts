import { GluegunToolbox } from "gluegun"

export async function renameReactNativeApp(
  toolbox: GluegunToolbox,
  oldName: string,
  newName: string,
  oldBundleIdentifier: string,
  newBundleIdentifier: string,
) {
  const { parameters, filesystem, print, strings } = toolbox
  const { kebabCase } = strings
  const { path } = filesystem

  // debug?
  const debug = Boolean(parameters.options.debug)
  const log = <T = unknown>(m: T): T => {
    debug && print.info(` ${m}`)
    return m
  }

  // lower case stuff
  const oldnamelower = oldName.toLowerCase()
  const newnamelower = newName.toLowerCase()

  // kebab case
  const oldnamekebab = kebabCase(oldName)
  const newnamekebab = kebabCase(newName)

  // SCREAMING_SNAKE_CASE
  const oldnamesnake = oldnamelower.replace(/[^a-z0-9]/g, "_").toUpperCase()
  const newnamesnake = newnamelower.replace(/[^a-z0-9]/g, "_").toUpperCase()

  // App name displayed
  const androidOldName = '"app_name", "(.*) - (.*)"'
  const androidNewName = `"app_name", "$1 - ${newName}"`
  const iOSOldName = 'PRODUCT_NAME = "(.*) - (.*)"'
  const iOSNewName = `PRODUCT_NAME = "$1 - ${newName}"`

  async function rename(oldFile: string, newFile: string) {
    log(`Renaming ${oldFile} to ${newFile}`)
    return filesystem.renameAsync(oldFile, newFile)
  }

  // rename files and folders

  // prettier-ignore
  await Promise.allSettled([
    rename(`ios/${oldName}.xcodeproj/xcshareddata/xcschemes/${oldName}.xcscheme`, `${newName}.xcscheme`),
    rename(`ios/${oldName}Tests/${oldName}Tests.m`, `${newName}Tests.m`),
    rename(`ios/${oldName}-Bridging-Header.h`, `${newName}-Bridging-Header.h`),
    rename(`ios/${oldName}.xcworkspace`, `${newName}.xcworkspace`),
    rename(`ios/${oldName}`, `${newName}`),
  ])

  // these we delay to avoid race conditions
  await Promise.allSettled([
    rename(`ios/${oldName}Tests`, `${newName}Tests`),
    rename(`ios/${oldName}.xcodeproj`, `${newName}.xcodeproj`),
  ])

  // if the bundle identifier / android package name changed,
  // we need to move everything to the new folder structure
  const oldPath = oldBundleIdentifier.replace(/\./g, "/")
  const newPath = newBundleIdentifier.replace(/\./g, "/")

  if (oldBundleIdentifier !== newBundleIdentifier) {
    log(`Renaming bundle identifier to ${newBundleIdentifier}`)

    // move everything at the old bundle identifier path to the new one
    await Promise.allSettled([
      filesystem.moveAsync(
        `android/app/src/main/java/${oldPath}`,
        `android/app/src/main/java/${newPath}`,
      ),
      filesystem.moveAsync(
        `android/app/src/debug/java/${oldPath}`,
        `android/app/src/debug/java/${newPath}`,
      ),
    ])
  }

  // list of schemes, there's one for each environment
  const schemesList = await filesystem.listAsync(
    path(`ios/${newName}.xcodeproj/xcshareddata/xcschemes/`),
  )

  // here's a list of all the files to patch the name in
  const filesToPatch = [
    `app.json`,
    `package.json`,
    `index.js`,
    `rnb-cli/src/tools/rnbv.js`,
    `android/settings.gradle`,
    `android/app/_BUCK`,
    `android/app/BUCK`,
    `android/app/build.gradle`,
    `android/app/src/debug/java/${newPath}/ReactNativeFlipper.java`,
    `android/app/src/main/AndroidManifest.xml`,
    `android/app/src/main/java/${newPath}/MainActivity.java`,
    `android/app/src/main/java/${newPath}/MainApplication.java`,
    `android/app/src/main/java/${newPath}/MainApplication.java`,
    `android/app/src/main/java/${newPath}/newarchitecture/MainApplicationReactNativeHost.java`,
    `android/app/src/main/java/${newPath}/newarchitecture/components/MainComponentsRegistry.java`,
    `android/app/src/main/java/${newPath}/newarchitecture/modules/MainApplicationTurboModuleManagerDelegate.java`,
    `android/app/src/main/jni/Android.mk`,
    `android/app/src/main/jni/MainApplicationTurboModuleManagerDelegate.h`,
    `android/app/src/main/jni/MainComponentsRegistry.h`,
    `android/app/src/main/res/values/strings.xml`,
    `ios/Podfile`,
    `ios/${newName}/Info.plist`,
    `ios/${newName}.xcodeproj/project.pbxproj`,
    `ios/${newName}.xcworkspace/contents.xcworkspacedata`,
    `ios/${newName}Tests/${newName}Tests.m`,
    `ios/${newName}/AppDelegate.mm`,
    `ios/${newName}/LaunchScreen.storyboard`,
    ...schemesList.map(
      (subdirectory) => `ios/${newName}.xcodeproj/xcshareddata/xcschemes/${subdirectory}`,
    ),
  ]

  // patch the files
  await Promise.allSettled(
    filesToPatch.map(async (file) => {
      // no need to patch files that don't exist
      const exists = await filesystem.existsAsync(path(file))
      if (!exists) return

      const content = await filesystem.readAsync(path(process.cwd(), file), "utf8")

      log(`Patching ${file} - ${oldName} to ${newName} and variants`)

      // replace all instances of the old name and all its variants
      const newContent = content
        .replace(new RegExp(oldBundleIdentifier, "g"), newBundleIdentifier)
        .replace(new RegExp(oldnamekebab, "g"), newnamekebab)
        .replace(new RegExp(oldnamesnake, "g"), newnamesnake)
        .replace(new RegExp(oldName, "g"), newName)
        .replace(new RegExp(oldnamelower, "g"), newnamelower)
        .replace(new RegExp(androidOldName, "g"), androidNewName)
        .replace(new RegExp(iOSOldName, "g"), iOSNewName)

      // write the new content back to the file
      await filesystem.writeAsync(file, newContent, { atomic: true })
    }),
  )
}
