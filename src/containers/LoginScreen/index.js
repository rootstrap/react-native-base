import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import LoginForm from '../../components/user/LoginForm';
import { login } from '../../actions/userActions';
import styles from './styles';

const LoginScreen = ({ login }) => (
  <View style={styles.container}>
    <Text style={styles.welcome}>
      LOGIN
    </Text>
    <LoginForm onSubmit={user => login(user.toJS())} />
  </View>
);

const { func } = PropTypes;

LoginScreen.propTypes = {
  login: func.isRequired
};

LoginScreen.navigationOptions = {
  title: 'Log In'
};

const mapDispatch = dispatch => ({
  login: user => dispatch(login(user))
});

export default connect(null, mapDispatch)(LoginScreen);
