import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, Button } from 'react-native';
import { connect } from 'react-redux';

import LoginForm from 'components/user/LoginForm';
import { login } from 'actions/userActions';
import translate from 'utils/i18n';
import styles from './styles';

const LoginScreen = ({ login, navigator }) => (
  <View style={styles.container}>
    <Text style={styles.welcome}>
      {translate('SIGN_IN.title')}
    </Text>
    <LoginForm onSubmit={user => login(user.toJS())} />
    <Button
      title={translate('SIGN_UP.title')} onPress={() => navigator.push({
        screen: 'reactnativebase.SignUpScreen'
      })}
    />
  </View>
);

const { func, object } = PropTypes;

LoginScreen.propTypes = {
  login: func.isRequired,
  navigator: object.isRequired
};

LoginScreen.navigationOptions = {
  title: 'Log In'
};

const mapDispatch = dispatch => ({
  login: user => dispatch(login(user))
});

export default connect(null, mapDispatch)(LoginScreen);
