import React from 'react';
import { SafeAreaView, StatusBar, Text, TouchableOpacity, useColorScheme } from 'react-native';

import styles from './styles';
import { WelcomePropTypes } from './types';

const WelcomeScreen: React.FunctionComponent<WelcomePropTypes> = ({ navigation: { navigate } }) => {
  const isDarkMode = useColorScheme() === 'dark';

  const onSignInPress = () => navigate('SignIn');
  const onSignUpPress = () => navigate('SignUp');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <TouchableOpacity
        testID="dummy-button"
        accessibilityState={{ disabled: false }}
        accessibilityRole={'button'}
        onPress={onSignInPress}>
        <Text>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        testID="dummy-button"
        accessibilityState={{ disabled: false }}
        accessibilityRole={'button'}
        onPress={onSignUpPress}>
        <Text>Sign Up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default WelcomeScreen;