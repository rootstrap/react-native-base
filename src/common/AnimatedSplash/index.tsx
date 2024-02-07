import React, { useState } from 'react';
import { Animated, Dimensions } from 'react-native';
import BootSplash from 'react-native-bootsplash';

import type { Props } from './types';

const AnimatedSplash = ({ onAnimationEnd }: Props) => {
  const [opacity] = useState(() => new Animated.Value(1));
  const [translateY] = useState(() => new Animated.Value(0));
  const { container, logo, brand } = BootSplash.useHideAnimation({
    manifest: require('../../assets/splash/bootsplash_manifest.json'),

    logo: require('../../assets/splash/bootsplash_logo.png'),
    darkLogo: require('../../assets/splash/bootsplash_dark_logo.png'),
    brand: require('../../assets/splash/bootsplash_brand.png'),
    darkBrand: require('../../assets/splash/bootsplash_dark_brand.png'),

    statusBarTranslucent: true,
    navigationBarTranslucent: false,

    animate: () => {
      const { height } = Dimensions.get('window');

      Animated.stagger(350, [
        Animated.spring(translateY, {
          useNativeDriver: true,
          toValue: -50,
        }),
        Animated.spring(translateY, {
          useNativeDriver: true,
          toValue: height,
        }),
      ]).start();

      Animated.timing(opacity, {
        useNativeDriver: true,
        toValue: 0,
        duration: 100,
        delay: 300,
      }).start(() => {
        onAnimationEnd();
      });
    },
  });

  return (
    <Animated.View {...container} style={[container.style]}>
      <Animated.Image {...logo} style={[logo.style, { transform: [{ translateY }] }]} />
      {brand && <Animated.Image {...brand} style={[brand.style, { opacity }]} />}
    </Animated.View>
  );
};

export default AnimatedSplash;
