#!/usr/bin/env node

const fs = require("fs")
const chalk = require("chalk")
const prompts = require("prompts")
const semver = require("semver")

const configMap = new Map([
  ["androidPath", "./android/app/build.gradle"],
  ["iosPath", "./ios/ReactNativeBase.xcodeproj/project.pbxproj"],
])
let environment;

const androidPath = configMap.get("androidPath")
const iosPath = configMap.get("iosPath")

const ANDROID_REGEX = /versionName "([.|\d]+)"/
const ANDROID_REGEX_CODE = /versionCode \d+/
const IOS_REGEX_PBX = /\s+MARKETING_VERSION = (.+);/m
const IOS_REGEX_PBX_BUILD_NUMBER = /\s+CURRENT_PROJECT_VERSION = (.+);/m
const REPLACE_IOS_PBX = /MARKETING_VERSION = .*;/
const REPLACE_IOS_BUILD_PBX = /CURRENT_PROJECT_VERSION = .*;/

function checkSemver(maybeSemver) {
  if (!semver.valid(maybeSemver)) {
    throw new Error(`Current version string is not semver: ${maybeSemver}`)
  }
}

function getAndroidVersion() {
  const regExp = new RegExp(`${environment}\\s*\\{[^{}]*\}`);

  const file = fs.readFileSync(androidPath, "utf8")
  const [currentLine] = file.match(regExp);

  const [, current] = currentLine.match(ANDROID_REGEX);

  checkSemver(current)
  return current
}

function getAndroidVersionCode() {
  const regExp = new RegExp(`${environment}\\s*\\{[^{}]*\}`);
  const file = fs.readFileSync(androidPath, "utf8")

  const [flavorBlock] = file.match(regExp);
  const [currentLine] = flavorBlock.match(ANDROID_REGEX_CODE)
  const [current] = currentLine.match(/\d+/)

  return parseInt(current, 0)
}

function getIOSVersion() {
  const ENV_REGEX = new RegExp(`release-${environment} [\\s\\S]*?\\{([\\s\\S]*?)\\}`, "gi");

  const file = fs.readFileSync(iosPath, "utf8")
  const [, flavorBlock] = file.match(ENV_REGEX);

  const [_, current] = flavorBlock.match(IOS_REGEX_PBX)
  checkSemver(current)
  return current
}

function getIOSBuildNumber() {
  const ENV_REGEX = new RegExp(`release-${environment} [\\s\\S]*?\\{([\\s\\S]*?)\\}`, "gi");

  const file = fs.readFileSync(iosPath, "utf8")
  const [, flavorBlock] = file.match(ENV_REGEX)
  const [currentVersion] = flavorBlock.match(IOS_REGEX_PBX_BUILD_NUMBER)
  const [current] = currentVersion.match(/\d+/)

  return parseInt(current, 0)
}

function android(releaseType) {
  const regExp = new RegExp(`${environment}\\s*\\{[^{}]*\}`)
  const updateOnlyCode = releaseType === "build"

  const currentVersion = getAndroidVersion()
  let nextVersion
  if (!updateOnlyCode) {
    nextVersion = semver.inc(currentVersion, releaseType)
  }

  const currentCode = getAndroidVersionCode()
  const nextCode = currentCode + 1

  const file = fs.readFileSync(androidPath, "utf8")
  const [flavorBlock] = file.match(regExp);

  let updatedBlock = flavorBlock.replace(ANDROID_REGEX_CODE, `versionCode ${nextCode}`)

  if (!updateOnlyCode) {
    updatedBlock = updatedBlock.replace(ANDROID_REGEX, `versionName "${nextVersion}"`)
  }

  const updatedFile = file.replace(regExp, updatedBlock)

  fs.writeFileSync(androidPath, updatedFile, "utf8")
  console.log(
    chalk.green(
      updateOnlyCode
        ? `Android SUCCESS! ${currentVersion}: ${currentCode} -> ${nextCode}`
        : `Android SUCCESS! ${currentVersion} -> ${nextVersion} with version code ${nextCode}`,
    ),
  )
}

function ios(releaseType) {
  const ENV_REGEX = new RegExp(`release-${environment} [\\s\\S]*?\\{([\\s\\S]*?)\\}`, "gi");
  const updateOnlyBuildNumber = releaseType === "build"

  const currentVersion = getIOSVersion()
  let nextVersion
  if (!updateOnlyBuildNumber) {
    nextVersion = semver.inc(currentVersion, releaseType)
  }

  const currentBuildNumber = getIOSBuildNumber()
  const nextBuildNumber = updateOnlyBuildNumber ? currentBuildNumber + 1 : 1

  const file = fs.readFileSync(iosPath, "utf8")
  const [, flavorBlock] = file.match(ENV_REGEX)

  let updatedBlock = flavorBlock.replace(REPLACE_IOS_BUILD_PBX, `CURRENT_PROJECT_VERSION = ${nextBuildNumber};`)

  if (!updateOnlyBuildNumber) {
    updatedBlock = updatedBlock.replace(REPLACE_IOS_PBX, `MARKETING_VERSION = ${nextVersion};`)
  }
  let occurrences = 0;
  const updatedFile = file.replace(ENV_REGEX, match => ++occurrences === 2 ? updatedBlock : match)
  fs.writeFileSync(iosPath, updatedFile, "utf8")

  console.log(
    chalk.green(
      updateOnlyBuildNumber
        ? `iOS SUCCESS! ${currentVersion}: ${currentBuildNumber} -> ${nextBuildNumber}`
        : `iOS SUCCESS! ${currentVersion} -> ${nextVersion}`,
    ),
  )
}

function selectEnvironment() {
  prompts({
    type: "select",
    name: "newEnv",
    message: "Which environment do you want to release?",
    choices: [
      { title: "Development", value: "develop" },
      { title: "Staging", value: "staging" },
      { title: "Production", value: "prod" },
      { title: "QA", value: "qa" },
    ],
    initial: 0,
  }).then(({ newEnv }) => {
    if (!newEnv) {
      process.exit(2)
    }
    environment = newEnv
    selectReleaseType()
  })
}

function selectReleaseType() {
  prompts({
    type: "select",
    name: "releaseType",
    message: `Which version is the next release? (current is ${getIOSVersion()}, iOS build ${getIOSBuildNumber()})`,
    choices: [
      { title: "Major", value: "major" },
      { title: "Minor", value: "minor" },
      { title: "Patch", value: "patch" },
      { title: "Build Number", value: "build" },
    ],
    initial: 0,
  }).then(({ releaseType }) => {
    if (!releaseType) {
      process.exit(2)
    }
    android(releaseType)
    ios(releaseType)
  })
}

function run() {
  configure()
  if (!validate()) {
    process.exit(1)
  }
  selectEnvironment()
}

function validate() {
  if (!fs.existsSync(androidPath)) {
    console.log(chalk.red(`Error: androidPath ${androidPath} does not exist`))
    return false
  }
  if (!fs.existsSync(iosPath)) {
    console.log(chalk.red(`Error: iosPath ${iosPath} does not exist`))
    return false
  }
  return true
}

function configure(configFilePath = `${process.cwd()}/rnbv.config.js`) {
  if (fs.existsSync(configFilePath)) {
    const config = require(`${process.cwd()}/rnbv.config.js`)
    for (key of configMap.keys()) {
      if (config[key]) {
        configMap.set(key, config[key])
      }
    }
  }
}

run()

module.exports = {
  run,
  configure,
  getAndroidVersion,
  getIOSVersion,
}
