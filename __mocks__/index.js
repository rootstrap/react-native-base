import mockRNDeviceInfo from 'react-native-device-info/jest/react-native-device-info-mock';

jest.mock('react-native-device-info', () => mockRNDeviceInfo);

jest.mock('react-native-bootsplash', () => ({
  hide: jest.fn().mockResolvedValueOnce(),
  useHideAnimation: jest.fn(({ animate }) => {
    // Simulate animation immediately
    animate();
    return {
      container: {},
      logo: {},
      brand: {},
    };
  }),
}));

jest.mock('common/AnimatedSplash', () =>
  jest.fn(({ onAnimationEnd }) => {
    // Call onAnimationEnd immediately to simulate the splash screen disappearing
    onAnimationEnd();
    return null;
  }),
);

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('@react-native-firebase/remote-config', () => ({
  __esModule: true,
  default: () => ({
    setDefaults: jest.fn().mockImplementation(() => Promise.resolve()),
    fetch: jest.fn().mockImplementation(() => Promise.resolve()),
    fetchAndActivate: jest.fn().mockImplementation(() => Promise.resolve()),
  }),
}));

jest.mock('i18next', () => ({
  t: (stringKey, options) => {
    const enFile = jest.requireActual('../src/localization/resources/en.json');
    return stringKey.split('.').reduce((result, key) => result[key], enFile);
  },
}));
