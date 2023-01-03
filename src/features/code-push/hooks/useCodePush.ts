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
      // TODO: Handle error on the UI
      console.log('error check pending update');
    }
  };

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
      await localPackage.install(CodePush.InstallMode.IMMEDIATE);
    } catch (error) {
      // Nice to have: report error
      setUpdateAvailable(false);
    } finally {
      setIsLoading(false);
    }
  };

  const syncAndInstall = async () => {
    try {
      await CodePush.sync(options);
    } catch (error) {
      // TODO: Handle error
      console.log('Error running CodePush.sync');
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
