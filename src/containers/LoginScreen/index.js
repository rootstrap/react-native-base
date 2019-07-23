import React, { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Text, View, Button } from 'react-native';
import { object } from 'prop-types';

import LoginForm from 'components/user/LoginForm';
import { login } from 'actions/userActions';
import translate from 'utils/i18n';
import { SIGN_UP_SCREEN } from 'constants/screens';
import styles from './styles';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const loginRequest = useCallback(user => dispatch(login(user)), [dispatch]);
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>{translate('SIGN_IN.title')}</Text>
      <LoginForm onSubmit={loginRequest} />
      <Button
        title={translate('SIGN_UP.title')}
        onPress={() => navigation.push({ component: { name: SIGN_UP_SCREEN } })}
      />
    </View>
  );
};

LoginScreen.propTypes = {
  navigation: object.isRequired,
};

LoginScreen.options = {
  topBar: {
    title: {
      text: translate('SIGN_IN.title'),
    },
  },
};

export default memo(LoginScreen);
