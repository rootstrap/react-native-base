import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, Text, TouchableOpacity, useColorScheme } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';

import { AppScreens, NativeStackScreenProps, StackParamList } from 'navigation/types';

import styles from './styles';

interface PropTypes extends NativeStackScreenProps<StackParamList, AppScreens.Welcome> {}

const WelcomeScreen: React.FunctionComponent<PropTypes> = () => {
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
