jest.mock('react-native-bootsplash', () => ({
  hide: jest.fn().mockResolvedValueOnce(),
}));

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
