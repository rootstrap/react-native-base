import { useEffect, useState } from 'react';
import { Linking, Platform } from 'react-native';
import Config from 'react-native-config';
import DeviceInfo from 'react-native-device-info';

import remoteConfig from '@react-native-firebase/remote-config';

enum RemoteFields {
  MINIMUM_VERSION = 'minimum_version',
}

export const useValidateAppVersion = () => {
  const [isUpdateAvailable, setIsUpdateAvailable] = useState<boolean | undefined>(false);

  const openStore = () => {
    Platform.select({
      ios: Linking.openURL(Config.APP_STORE_URL),
      android: Linking.openURL(Config.PLAY_STORE_URL),
    });
  };

  const compareVersions = (local: string, remote: string) => {
    if (!local || !remote) {
      return false;
    }

    const localVersion = local.split('.').map(versionNumber => parseInt(versionNumber, 10));
    const remoteVersion = remote.split('.').map(versionNumber => parseInt(versionNumber, 10));

    for (let i = 0; i < Math.max(localVersion.length, remoteVersion.length); i++) {
      const localVersionComponent = localVersion[i] || 0;
      const remoteVersionComponent = remoteVersion[i] || 0;

      if (localVersionComponent < remoteVersionComponent) {
        return true;
      }
    }
  };

  useEffect(() => {
    const checkUpdate = async () => {
      try {
        remoteConfig().setDefaults({
          minimum_version: '',
        });

        await remoteConfig().fetchAndActivate();

        const remoteVersion = remoteConfig().getValue(RemoteFields.MINIMUM_VERSION).asString();
        const localVersion = DeviceInfo.getVersion();
        const updateAvailable = compareVersions(localVersion, remoteVersion);
        setIsUpdateAvailable(updateAvailable);
      } catch (err) {
        console.log(err);
      }
    };
    checkUpdate();
  }, []);

  return { isUpdateAvailable, openStore };
};
