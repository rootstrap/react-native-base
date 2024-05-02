import React, { useCallback } from 'react';
import { Linking, Modal, Platform, SafeAreaView, Text, View } from 'react-native';

import Button from 'common/Button';

import { translate } from 'localization/hooks';

import { AuthStackScreens } from 'navigation/stacks/auth';

import { checkVersion } from 'network/services/force-update';

import styles from './styles';
import { WelcomeNavigationProps } from './types';

type WelcomeScreenProps = {
  // here you can add any props that you need to pass to the WelcomeScreen component
} & WelcomeNavigationProps;

const WelcomeScreen = ({ navigation: { navigate } }: WelcomeScreenProps) => {
  const onSignInPress = useCallback(() => navigate(AuthStackScreens.SignIn), [navigate]);
  const onSignUpPress = useCallback(() => navigate(AuthStackScreens.SignUp), [navigate]);

  const openStore = () => {
    if (Platform.OS === 'android') {
      Linking.openURL('https://play.google.com/store/apps/details?id=es.bancosantander.apps&hl=es');
    } else {
      Linking.openURL('https://apps.apple.com/es/app/santander/id408043474');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={checkVersion()}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{translate('alert.update')}</Text>
            <Button title={translate('buttons.ok')} onPress={openStore} />
          </View>
        </View>
      </Modal>
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
