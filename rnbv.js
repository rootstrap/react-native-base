#!/usr/bin/env node
/* eslint-disable */
const fs = require('fs');
const chalk = require('chalk');
const prompts = require('prompts');
const semver = require('semver');
const _ = require('lodash');

const envs = ['dev', 'staging', 'prod'];

let config;

const ANDROID_REGEX = /versionName "([.|\d]+)"/;
const ANDROID_REGEX_CODE = /versionCode \d+/;
const IOS_REGEX = /\s\<key\>CFBundleShortVersionString\<\/key\>\n\s+\<string\>(.+)\<\/string\>/m;

function checkSemver(maybeSemver) {
  if (!semver.valid(maybeSemver)) {
    throw new Error(`Current version string is not semver: ${maybeSemver}`);
  }
}

function getAndroidVersion() {
  const file = fs.readFileSync(config.androidPath, 'utf8');
  const [, current] = file.match(ANDROID_REGEX);

  checkSemver(current);

  return current;
}

function getAndroidVersionCode() {
  const file = fs.readFileSync(config.androidPath, 'utf8');
  const [currentLine] = file.match(ANDROID_REGEX_CODE);
  const [current] = currentLine.match(/\d+/);

  return parseInt(current, 0);
}

function getIOSVersion(env = 'dev') {
  const file = fs.readFileSync(config.iosPaths[env], 'utf8');
  const [_, current] = file.match(IOS_REGEX);

  checkSemver(current);

  return current;
}

function android(releaseType) {
  const current = getAndroidVersion();
  const currentCode = getAndroidVersionCode();
  const file = fs.readFileSync(config.androidPath, 'utf8');
  const next = semver.inc(current, releaseType);
  const nextCode = currentCode + 1;
  let updated = file.replace(ANDROID_REGEX, `versionName "${next}"`);
  updated = updated.replace(ANDROID_REGEX_CODE, `versionCode ${nextCode}`);

  fs.writeFileSync(config.androidPath, updated, 'utf8');

  console.log(chalk.green(`Android SUCCESS! ${current} -> ${next} with version code ${nextCode}`));
}

function ios(releaseType, env = 'dev') {
  if (!config.iosPaths[env]) return;

  const current = getIOSVersion(env);
  const file = fs.readFileSync(config.iosPaths[env], 'utf8');
  const next = semver.inc(current, releaseType);
  const updated = file.replace(`<string>${current}</string>`, `<string>${next}</string>`);

  fs.writeFileSync(config.iosPaths[env], updated, 'utf8');

  console.log(chalk.green(`iOS SUCCESS! ${env}: ${current} -> ${next}`));
}

function validate() {
  // Validate that it has configs
  if (_.isEmpty(config)) {
    console.log(chalk.red(`Error: no configs found at rnbv.config.js`));
    return false;
  }
  // Validate that AndroidPath exists
  if (!fs.existsSync(config.androidPath)) {
    console.log(chalk.red(`Error: androidPath at ${config.androidPath} does not exist`));
    return false;
  }

  //Validate that iosPaths exist
  const iosEnvs = (config.iosPaths && _.keys(config.iosPaths)) || [];
  iosEnvs.forEach(env => {
    const path = config.iosPaths[env];
    if (!fs.existsSync(path)) {
      console.log(chalk.red(`Error: iosPath for ${env} at ${path} does not exist`));
      return false;
    }
  });

  // All good
  return true;
}

function configure(configFilePath = `${process.cwd()}/rnbv.config.js`) {
  if (!fs.existsSync(configFilePath)) {
    console.log(chalk.red(`Error: missing rnbv config, set it up at rnbv.config.js`));
    return;
  }
  config = require(`${process.cwd()}/rnbv.config.js`);
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
      { title: 'Major - X.x.x', value: 'major' },
      { title: 'Minor - x.X.x', value: 'minor' },
      { title: 'Patch - x.x.X', value: 'patch' },
    ],
    initial: 0,
  }).then(({ releaseType }) => {
    if (!releaseType) {
      // User didn't select a release type
      process.exit(2);
    }

    // Bump Android
    android(releaseType);

    // Bump iOS
    const iosEnvs = (config.iosPaths && _.keys(config.iosPaths)) || [];
    iosEnvs.forEach(env => ios(releaseType, env));
  });
}

run();

module.exports = {
  run,
  configure,
  getAndroidVersion,
  getIOSVersion,
};
