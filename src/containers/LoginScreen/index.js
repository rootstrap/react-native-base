import React from 'react';
import { Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import { func, object } from 'prop-types';
import FastImage from 'react-native-fast-image';

import LoginForm from 'components/user/LoginForm';
import { login } from 'actions/userActions';
import translate from 'utils/i18n';
import { SIGN_UP_SCREEN } from 'constants/screens';
import styles from './styles';

const LoginScreen = ({ login, navigation }) => (
  <View style={styles.container}>
    <FastImage
      style={styles.image}
      source={require('assets/images/react-logo.png')}
    />
    <Text style={styles.welcome}>
      {translate('SIGN_IN.title')}
    </Text>
    <LoginForm onSubmit={user => login(user)} />
    <Button
      title={translate('SIGN_UP.title')}
      onPress={() => navigation.push({ component: { name: SIGN_UP_SCREEN } })}
    />
  </View>
);

LoginScreen.propTypes = {
  navigation: object.isRequired,
  login: func.isRequired,
};

LoginScreen.options = {
  topBar: {
    title: {
      text: translate('SIGN_IN.title')
    }
  },
};

const mapDispatch = dispatch => ({
  login: user => dispatch(login(user))
});

export default connect(null, mapDispatch)(LoginScreen);
