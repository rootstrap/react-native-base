import React, { memo, useCallback } from 'react';
import { Text, View, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { object } from 'prop-types';

import SignUpForm from 'components/user/SignUpForm';
import { signUp } from 'actions/userActions';
import translate from 'utils/i18n';
import styles from './styles';

const SignUpScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const signUpRequest = useCallback(
    user => dispatch(signUp(user)),
    [dispatch]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        {translate('SIGN_UP.title')}
      </Text>
      <SignUpForm onSubmit={signUpRequest} />
      <Button
        title={translate('SIGN_IN.title')}
        onPress={navigation.pop}
      />
    </View>
  );
};

SignUpScreen.propTypes = {
  navigation: object.isRequired
};

SignUpScreen.options = {
  topBar: {
    title: {
      text: translate('SIGN_UP.title')
    }
  },
};

export default memo(SignUpScreen);
