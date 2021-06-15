# Android Fastlane configuration
============================

## Installation and requirements

* Ensure JDK 1.8 is installed

* Ensure proper version of Android SDK command line tools is installed

* Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew cask install fastlane`


* Appropiate `.env` file should be present in `android` folder as with a manual build

## General workflow

* Fastlane for Android basically executes Gradle commands for cleaning, installing Android dependencies and assembling the project into a .apk
* Application file is published to Google Play Store - keystore file in json format needs to be present and referenced by env var `JSON_KEYFILE`
* (alternatively) Push build to S3 (requires `BUILD_BUCKET` as well as AWS credentials defined in environment vars)
* (optionally) Send Slack notification to the webhook and channel specified by env vars `SLACK_URL` and `SLACK_CHANNEL`


## Actions breakdown

Modify the Fastfile as appropiate for your project.

Execute with
```
fastlane lane_name
```

### debug_*
Builds and archive corresponding flavor for local use

### release_*_s3
Builds corresponding flavor and pushes to S3

### release_*_appstore
Builds corresponding flavor and pushes to Play Store


----
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
