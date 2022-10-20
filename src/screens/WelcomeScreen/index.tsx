import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, Text, TouchableOpacity, useColorScheme } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';

import styles from './styles';

const WelcomeScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    setTimeout(() => RNBootSplash.hide({ fade: true }), 3000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text accessibilityRole={'text'}>Welcome Screen</Text>
      <TouchableOpacity
        testID="dummy-button"
        accessibilityState={{ disabled: false }}
        accessibilityRole={'button'}>
        <Text>Dummy Button</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
