import { Linking, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

import remoteConfig from '@react-native-firebase/remote-config';

export const isUpdated = (): boolean => {
  remoteConfig()
    .setDefaults({
      minimum_version: '',
    })
    .then(() => remoteConfig().fetchAndActivate())
    .then(fetchedRemotely => {
      if (fetchedRemotely) {
        const remoteVersion = remoteConfig().getValue('').asString();
        const localVersion = DeviceInfo.getVersion();
        return compareVersions(localVersion, remoteVersion);
      }
    });
  return true;
};

export const openStore = () => {
  if (Platform.OS === 'android') {
    Linking.openURL('');
  } else {
    Linking.openURL('');
  }
};

function compareVersions(local: string, remote: string): boolean {
  const localComponents = local.split('.').map(component => parseInt(component));
  const remoteComponents = remote.split('.').map(component => parseInt(component));

  for (let i = 0; i < Math.max(localComponents.length, remoteComponents.length); i++) {
    const localComponent = localComponents[i] || 0;
    const remoteComponent = remoteComponents[i] || 0;

    if (localComponent < remoteComponent) {
      return false;
    } else if (localComponent > remoteComponent) {
      return true;
    }
  }

  return true;
}
