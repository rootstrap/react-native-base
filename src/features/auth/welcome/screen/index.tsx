import React, { useCallback } from 'react';
import { SafeAreaView } from 'react-native';

import Button from 'common/Button';

import { ForceUpdateModal } from 'features/force-update-modal';

import { translate } from 'localization/hooks';

import { AuthStackScreens } from 'navigation/stacks/auth';

import styles from './styles';
import { WelcomeNavigationProps } from './types';

type WelcomeScreenProps = {
  // here you can add any props that you need to pass to the WelcomeScreen component
} & WelcomeNavigationProps;

const WelcomeScreen = ({ navigation: { navigate } }: WelcomeScreenProps) => {
  const onSignInPress = useCallback(() => navigate(AuthStackScreens.SignIn), [navigate]);
  const onSignUpPress = useCallback(() => navigate(AuthStackScreens.SignUp), [navigate]);

  return (
    <SafeAreaView style={styles.container}>
      <ForceUpdateModal />
      <Button
        testID="dummy-button"
        accessibilityState={{ disabled: false }}
        title={translate('screen.welcome.signIn')}
        onPress={onSignInPress}
      />
      <Button
        testID="dummy-button"
        accessibilityState={{ disabled: false }}
        title={translate('screen.welcome.signUp')}
        onPress={onSignUpPress}
      />
    </SafeAreaView>
  );
};

export default WelcomeScreen;
