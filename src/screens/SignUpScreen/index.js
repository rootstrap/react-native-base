import React, { memo, useCallback } from 'react';
import { Text, View, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { object } from 'prop-types';

import SignUpForm from 'components/SignUpForm';
import { signUp } from 'actions/userActions';
import strings from 'locale';
import useNavigateOnLoginEffect from 'hooks/useNavigateOnLoginEffect';
import styles from './styles';

const SignUpScreen = memo(({ navigation }) => {
  const dispatch = useDispatch();

  const signUpRequest = useCallback(user => dispatch(signUp(user)), [dispatch]);

  useNavigateOnLoginEffect(navigation);

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>{strings.SIGN_UP.title}</Text>
      <SignUpForm onSubmit={signUpRequest} />
      <Button title={strings.SIGN_IN.title} onPress={() => navigation.goBack()} />
    </View>
  );
});

SignUpScreen.propTypes = {
  navigation: object.isRequired,
};

SignUpScreen.navigationOptions = {
  title: strings.SIGN_UP.title,
};

export default SignUpScreen;
