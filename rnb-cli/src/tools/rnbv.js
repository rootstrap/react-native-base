#!/usr/bin/env node

const fs = require("fs")
const chalk = require("chalk")
const prompts = require("prompts")
const semver = require("semver")

const configMap = new Map([
  ["androidPath", "./android/app/build.gradle"],
  ["iosPath", "./ios/ReactNativeBase/Info.plist"],
])

const androidPath = configMap.get("androidPath")
const iosPath = configMap.get("iosPath")

const ANDROID_REGEX = /versionName "([.|\d]+)"/
const ANDROID_REGEX_CODE = /versionCode \d+/
const IOS_REGEX = /\s\<key\>CFBundleShortVersionString\<\/key\>\n\s+\<string\>(.+)\<\/string\>/m
const IOS_REGEX_BUILD_NUMBER = /\s\<key\>CFBundleVersion\<\/key\>\n\s+\<string\>(.+)\<\/string\>/m

function checkSemver(maybeSemver) {
  if (!semver.valid(maybeSemver)) {
    throw new Error(`Current version string is not semver: ${maybeSemver}`)
  }
}

function getAndroidVersion() {
  const file = fs.readFileSync(androidPath, "utf8")
  const [_, current] = file.match(ANDROID_REGEX)
  checkSemver(current)
  return current
}

function getAndroidVersionCode() {
  const file = fs.readFileSync(androidPath, "utf8")
  const [currentLine] = file.match(ANDROID_REGEX_CODE)
  const [current] = currentLine.match(/\d+/)
  return parseInt(current, 0)
}

function getIOSVersion() {
  const file = fs.readFileSync(iosPath, "utf8")
  const [_, current] = file.match(IOS_REGEX)
  checkSemver(current)
  return current
}

function getIOSBuildNumber() {
  const file = fs.readFileSync(iosPath, "utf8")
  const [currentLine] = file.match(IOS_REGEX_BUILD_NUMBER)
  const [current] = currentLine.match(/\d+/)

  return parseInt(current, 0)
}

function android(releaseType) {
  const updateOnlyCode = releaseType === "build"

  const currentVersion = getAndroidVersion()
  let nextVersion
  if (!updateOnlyCode) {
    nextVersion = semver.inc(currentVersion, releaseType)
  }

  const currentCode = getAndroidVersionCode()
  const nextCode = currentCode + 1

  const file = fs.readFileSync(androidPath, "utf8")

  let updated = file.replace(ANDROID_REGEX_CODE, `versionCode ${nextCode}`)

  if (!updateOnlyCode) {
    updated = updated.replace(ANDROID_REGEX, `versionName "${nextVersion}"`)
  }

  fs.writeFileSync(androidPath, updated, "utf8")
  console.log(
    chalk.green(
      updateOnlyCode
        ? `Android SUCCESS! ${currentVersion}: ${currentCode} -> ${nextCode}`
        : `Android SUCCESS! ${currentVersion} -> ${nextVersion} with version code ${nextCode}`,
    ),
  )
}

function ios(releaseType) {
  const updateOnlyBuildNumber = releaseType === "build"

  const currentVersion = getIOSVersion()
  let nextVersion
  if (!updateOnlyBuildNumber) {
    nextVersion = semver.inc(currentVersion, releaseType)
  }

  const currentBuildNumber = getIOSBuildNumber()
  const nextBuildNumber = updateOnlyBuildNumber ? currentBuildNumber + 1 : 0

  const file = fs.readFileSync(iosPath, "utf8")

  let updated = file.replace(
    `<string>${currentBuildNumber}</string>`,
    `<string>${nextBuildNumber}</string>`,
  )

  if (!updateOnlyBuildNumber) {
    updated = updated.replace(
      `<string>${currentVersion}</string>`,
      `<string>${nextVersion}</string>`,
    )
  }

  fs.writeFileSync(iosPath, updated, "utf8")

  console.log(
    chalk.green(
      updateOnlyBuildNumber
        ? `iOS SUCCESS! ${currentVersion}: ${currentBuildNumber} -> ${nextBuildNumber}`
        : `iOS SUCCESS! ${currentVersion} -> ${nextVersion}`,
    ),
  )
}

function run() {
  configure()
  if (!validate()) {
    process.exit(1)
  }
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
