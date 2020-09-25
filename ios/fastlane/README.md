# iOS Fastlane configuration
============================

We use [Fastlane](https://docs.fastlane.tools/) for automating the iOS application build and submission

## Installation and requirements

* Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

* Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew cask install fastlane`

* Automatic code signing should be disabled in project

* Valid Mobile provisioning profiles should be associated to the corresponding target and placed in `~/Library/MobileDevice/Provisioning Profiles/`

* Appropiate `.env` file should be present in `ios` folder as with a manual build

* In addition the following environment variables should be available to Fastlane

```
FASTLANE_USER                                   : Your App Store Connect / Apple Developer Portal id used for managing certificates and submitting to the App Store
FASTLANE_PASSWORD                               : Password for FASTLANE_USER
FASTLANE_TEAM_ID                                : The organization's team id in the Apple Developer portal
FASTLANE_APPLE_APPLICATION_SPECIFIC_PASSWORD    : Application specific password generated for FASTLANE_USER, required to upload a binary to App Store Connect
FASTLANE_ITC_TEAM_ID                            : App Store Connect team id, required for binary submission
LANG,LC_ALL                                     : These set up the locale your shell and all the commands you execute run at. Set to `en_US.UTF-8`
```

## General workflow

* Run `pod install`
* Build and sign Archive file
* Publish to TestFlight (including changelog) and commit a new release tag (production only)
* (alternatively) Push adhoc build to S3 (requires `BUILD_BUCKET` as well as AWS credentials defined in environment vars)
* (optionally) Send Slack notification to the webhook and channel specified by env vars `SLACK_URL` and `SLACK_CHANNEL`

## Build signing

These scripts perform the following actions:
* Create temporary keychain
* Import Certificate and Private key file as defined by env vars (APPLE_CERT,APPLE_KEY,APPLE_KEY_PASSWORD) into temporary keychain
* Build and sign the archive with the proper certificate

## TestFlight submission

* Requires Apple Developer portal user defined by env var: `FASTLANE_USER`
* Requires an Apple application-specific password for use of Fastlane defined by env var: `FASTLANE_APPLE_APPLICATION_SPECIFIC_PASSWORD`
* First time execution on a new machine will require a prompt due to 2FA authentication. Subsequent runs should be able to run fully non-interactively

## Actions breakdown

Review and modify the Fastfile as appropiate for your project's targets and desired workflows.

### ios debug_*
Validates build for corresponding target 
```
fastlane ios debug_develop
```

### ios release_*_s3
Builds corresponding target for AdHoc distribution and pushes to S3 bucket specified by env vars -requires AdHoc provisioning profile associated to Certificate
```
fastlane ios release_dev_s3
```

### ios release_*_appstore
Builds corresponding target for for Appstore and pushes to TestFlight -requires AppStore provisioning profile associated to Certificate
```
fastlane ios release_dev_appstore
```

----
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
