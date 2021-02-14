# Android Fastlane configuration
============================

## Installation and requirements

* Ensure JDK 1.8 is installed

* Ensure proper version of Android SDK command line tools is installed

* Run bundler to install Fastlane and required plugins
```
[sudo] bundle update
```

* Appropiate `.env` file should be present in `android` folder as with a manual build

## General workflow

* Fastlane for Android basically executes Gradle commands for cleaning, installing Android dependencies and assembling the project into an .apk
* Application file is published to Google Play Store - keystore file in json format needs to be present and referenced by env var `JSON_KEYFILE`
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

