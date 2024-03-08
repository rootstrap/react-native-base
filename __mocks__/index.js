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
