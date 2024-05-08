import { useEffect, useState } from 'react';
import { Linking, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

import remoteConfig from '@react-native-firebase/remote-config';

export const useValidateAppVersion = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const checkAndUpdate = async () => {
      const updated = await isUpdated();
      if (!updated) {
        setShowModal(true);
      }
    };
    checkAndUpdate();
  });

  return { showModal, openStore };
};

const isUpdated = async (): Promise<boolean> => {
  remoteConfig().setDefaults({
    minimum_version: '',
  });

  const fetchedRemotely = await remoteConfig().fetchAndActivate();

  if (fetchedRemotely) {
    const remoteVersion = remoteConfig().getValue('').asString();
    const localVersion = DeviceInfo.getVersion();
    return compareVersions(localVersion, remoteVersion);
  }
  return true;
};

const openStore = () => {
  Platform.select({
    ios: Linking.openURL(''),
    android: Linking.openURL(''),
  });
};

function compareVersions(local: string, remote: string): boolean {
  const localVersion = local.split('.').map(versionNumber => parseInt(versionNumber, 10));
  const remoteVersion = remote.split('.').map(versionNumber => parseInt(versionNumber, 10));

  for (let i = 0; i < Math.max(localVersion.length, remoteVersion.length); i++) {
    const localVersionComponent = localVersion[i] || 0;
    const remoteVersionComponent = remoteVersion[i] || 0;

    if (localVersionComponent < remoteVersionComponent) {
      return false;
    } else if (localVersionComponent > remoteVersionComponent) {
      return true;
    }
  }

  return true;
}
