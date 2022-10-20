#!/usr/bin/env node

const fs = require('fs');
const chalk = require('chalk');
const prompts = require('prompts');
const semver = require('semver');

const configMap = new Map([
  ['androidPath', './android/app/build.gradle'],
  ['iosPath', './ios/ReactNativeBase/Info.plist'],
]);

const ANDROID_REGEX = /versionName "([.|\d]+)"/;
const IOS_REGEX = /\s\<key\>CFBundleShortVersionString\<\/key\>\n\s+\<string\>(.+)\<\/string\>/m;

function checkSemver(maybeSemver) {
  if (!semver.valid(maybeSemver)) {
    throw new Error(`Current version string is not semver: ${maybeSemver}`);
  }
}

function getAndroidVersion() {
  const file = fs.readFileSync(configMap.get('androidPath'), 'utf8');
  const [_, current] = file.match(ANDROID_REGEX);
  checkSemver(current);
  return current;
}

function getIOSVersion() {
  const file = fs.readFileSync(configMap.get('iosPath'), 'utf8');
  const [_, current] = file.match(IOS_REGEX);
  checkSemver(current);
  return current;
}

function android(releaseType) {
  const current = getAndroidVersion();
  const file = fs.readFileSync(configMap.get('androidPath'), 'utf8');
  const next = semver.inc(current, releaseType);
  const updated = file.replace(ANDROID_REGEX, `versionName "${next}"`);
  fs.writeFileSync(configMap.get('androidPath'), updated, 'utf8');

  console.log(chalk.green(`Android SUCCESS! ${current} -> ${next}`));
}

function ios(releaseType) {
  const current = getIOSVersion();
  const file = fs.readFileSync(configMap.get('iosPath'), 'utf8');
  const next = semver.inc(current, releaseType);
  const updated = file.replace(`<string>${current}</string>`, `<string>${next}</string>`);
  fs.writeFileSync(configMap.get('iosPath'), updated, 'utf8');

  console.log(chalk.green(`iOS SUCCESS! ${current} -> ${next}`));
}

function run() {
  configure();
  if (!validate()) {
    process.exit(1);
  }
  prompts({
    type: 'select',
    name: 'releaseType',
    message: `Which version is the next release? (current is ${getIOSVersion()})`,
    choices: [
      { title: 'Major', value: 'major' },
      { title: 'Minor', value: 'minor' },
      { title: 'Patch', value: 'patch' },
    ],
    initial: 0,
  }).then(({ releaseType }) => {
    if (!releaseType) {
      process.exit(2);
    }
    android(releaseType);
    ios(releaseType);
  });
}

function validate() {
  if (!fs.existsSync(configMap.get('androidPath'))) {
    console.log(chalk.red(`Error: androidPath ${configMap.get('androidPath')} does not exist`));
    return false;
  }
  if (!fs.existsSync(configMap.get('iosPath'))) {
    console.log(chalk.red(`Error: iosPath ${configMap.get('iosPath')} does not exist`));
    return false;
  }
  return true;
}

function configure(configFilePath = `${process.cwd()}/rnbv.config.js`) {
  if (fs.existsSync(configFilePath)) {
    const config = require(`${process.cwd()}/rnbv.config.js`);
    for (key of configMap.keys()) {
      if (config[key]) {
        configMap.set(key, config[key]);
      }
    }
  }
}

run();

module.exports = {
  run,
  configure,
  getAndroidVersion,
  getIOSVersion,
};
