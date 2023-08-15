import Button from 'common/Button';
import { useTranslate } from 'localization/hooks';
import React, { useCallback } from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';

import { AuthStackScreens } from 'navigation/stacks/auth';

import styles from './styles';
import { WelcomeNavigationProps } from './types';

type WelcomeScreenProps = {
  // here you can add any props that you need to pass to the WelcomeScreen component
} & WelcomeNavigationProps;

const WelcomeScreen = ({ navigation: { navigate } }: WelcomeScreenProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const { t } = useTranslate();
  const onSignInPress = useCallback(() => navigate(AuthStackScreens.SignIn), [navigate]);
  const onSignUpPress = useCallback(() => navigate(AuthStackScreens.SignUp), [navigate]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Button
        testID="dummy-button"
        accessibilityState={{ disabled: false }}
        title={t('screen.welcome.signIn')}
        onPress={onSignInPress}
      />
      <Button
        testID="dummy-button"
        accessibilityState={{ disabled: false }}
        title={t('screen.welcome.signUp')}
        onPress={onSignUpPress}
      />
    </SafeAreaView>
  );
};

export default WelcomeScreen;
