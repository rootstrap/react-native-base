import { Platform } from 'react-native';

export const IOS = 'ios';
export const ANDROID = 'android';
export const BOTH_PLATFORMS = 'both';

export const IS_IOS = Platform.OS === IOS;
export const IS_ANDROID = Platform.OS === ANDROID;

export const platformEnabler = (platform = BOTH_PLATFORMS) =>
  platform === BOTH_PLATFORMS ||
  (platform === IOS && IS_IOS) ||
  (platform === ANDROID && IS_ANDROID);
