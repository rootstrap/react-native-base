# iOS Fastlane configuration
============================

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

Modify the Fastfile as appropiate for your project.
### ios debug_develop
Builds AdHoc for Develop target
```
fastlane ios debug_develop
```

### ios debug_staging
Builds Appstore for Staging target
```
fastlane ios debug_staging
```

### ios debug_production
Builds Appstore for Production target
```
fastlane ios debug_production
```

### ios release_qa_adhoc
Builds Develop target for AdHoc distribution and pushes to S3 bucket specified by env vars.
```
fastlane ios release_qa_adhoc
```

### ios release_qa_appstore
Builds Develop target for Appstore and pushes to TestFlight.
```
fastlane ios release_qa_appstore
```

### ios release_staging
Builds Staging target for Appstore and pushes to TestFlight.
```
fastlane ios release_staging
```

### ios release_production
Builds Production target for Appstore and pushes to TestFlight.

```
fastlane ios release_production
```


----
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
