import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import CodePush, { CodePushOptions, Package } from 'react-native-code-push';

type RemotePackageBinary = Package & {
  updateAppVersion?: boolean;
};

const useCodePush = (options?: CodePushOptions) => {
  const [isLoading, setIsLoading] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [bundleVersion, setBundleVersion] = useState<string | null>(null);

  const getCurrentBundleVersion = async () => {
    try {
      const currentBundle = await CodePush.getUpdateMetadata(CodePush.UpdateState.RUNNING);
      setBundleVersion(`${currentBundle?.appVersion}-${currentBundle?.label}`);
    } catch (error) {
      console.log('error getting bundle info');
    }
  };

  const checkPendingUpdate = async () => {
    try {
      const localPackage = await CodePush.getUpdateMetadata(CodePush.UpdateState.PENDING);
      if (localPackage) {
        // TODO: Restart the app or Prompt the user to restart, etc
        console.log('An update is pending, consider restarting the app');
      }
    } catch (error) {
      console.log('error check pending update');
    }
  };

  // for a more custom flow, showing the download progress
  // restart the app manually using CodePush.restart app
  const checkForUpdate = async () => {
    try {
      const remotePackage = await CodePush.checkForUpdate(
        undefined,
        ({ updateAppVersion, appVersion }: RemotePackageBinary) => {
          if (updateAppVersion) {
            return Alert.alert(
              'Update available',
              `Version ${appVersion} is available, please update your app`,
              [
                {
                  text: 'Later',
                  onPress: () => console.log('Later Pressed'),
                  style: 'cancel',
                },
                { text: 'Update now', onPress: () => console.log('Open store') },
              ],
            );
          }
        },
      );

      RNBootSplash.hide({ fade: true });

      if (!remotePackage) {
        return setUpdateAvailable(false);
      }

      setUpdateAvailable(true);
      setIsLoading(true);
      const localPackage = await remotePackage.download();

      setTimeout(async () => {
        await localPackage.install(CodePush.InstallMode.IMMEDIATE);
      }, 6000);
      // timeout for the sake of the example
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // code push update with mandatory flag -m
  // restart the app, without it install the update on next app restart
  const syncAndInstall = async () => {
    try {
      await CodePush.sync(options);
    } catch (error) {
      console.log('Error running CodePush.sync'); // WHAT TO DO HERE
    }
  };

  useEffect(() => {
    getCurrentBundleVersion();
  }, []);

  return {
    syncAndInstall,
    checkForUpdate,
    checkPendingUpdate,
    isLoading,
    updateAvailable,
    bundleVersion,
  } as {
    syncAndInstall: () => Promise<void>;
    checkForUpdate: () => Promise<void>;
    checkPendingUpdate: () => Promise<void>;
    isLoading: boolean;
    updateAvailable: boolean;
    bundleVersion: string;
  };
};

export default useCodePush;
