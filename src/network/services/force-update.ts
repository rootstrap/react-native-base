import DeviceInfo from 'react-native-device-info';

import remoteConfig from '@react-native-firebase/remote-config';

export const checkVersion = (): boolean => {
  remoteConfig()
    .setDefaults({
      remote_version: '0.1.1',
    })
    .then(() => remoteConfig().fetchAndActivate())
    .then(fetchedRemotely => {
      if (fetchedRemotely) {
        const remoteVersion = remoteConfig().getValue('remote_version').asString();
        const localVersion = DeviceInfo.getVersion();
        return compareVersions(localVersion, remoteVersion);
      }
    });
  return true;
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
