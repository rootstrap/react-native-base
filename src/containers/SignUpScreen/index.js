import React, { memo, useCallback } from 'react';
import { Text, View, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { object } from 'prop-types';
import { isEmpty } from 'lodash';

import SignUpForm from 'components/user/SignUpForm';
import { signUp } from 'actions/userActions';
import useSessionChangeEffect from 'hooks/useSessionChangeEffect';
import translate from 'utils/i18n';
import { MAIN_SCREEN } from 'constants/screens';
import styles from './styles';

const SignUpScreen = memo(({ navigation }) => {
  const dispatch = useDispatch();

  const signUpRequest = useCallback(user => dispatch(signUp(user)), [dispatch]);

  useSessionChangeEffect(
    user => {
      const userLoggedIn = !isEmpty(user);
      if (userLoggedIn) {
        navigation.navigate(MAIN_SCREEN);
      }
    },
    [navigation]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>{translate('SIGN_UP.title')}</Text>
      <SignUpForm onSubmit={signUpRequest} />
      <Button title={translate('SIGN_IN.title')} onPress={() => navigation.goBack()} />
    </View>
  );
});

SignUpScreen.propTypes = {
  navigation: object.isRequired,
};

SignUpScreen.options = {
  topBar: {
    title: {
      text: translate('SIGN_UP.title'),
    },
  },
};

export default SignUpScreen;
