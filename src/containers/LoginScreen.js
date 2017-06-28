import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

import LoginForm from '../components/user/LoginForm';
import { login } from '../actions/userActions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
});

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
