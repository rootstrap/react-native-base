import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LoginForm from '../components/user/LoginForm';
import * as userActions from '../actions/userActions';

const LoginScreen = ({ navigation, actions: { login } }) => (
  <View style={styles.container}>
    <Text style={styles.welcome}>
      LOGIN
    </Text>
    <LoginForm onSubmit={(user) => login(user.toJS())}/>
  </View>
);

const { object } = PropTypes;

LoginScreen.propTypes = {
  navigation: object.isRequired
};

LoginScreen.navigationOptions = {
  title: 'Log In'
};

const mapDispatch = dispatch => ({
  actions: bindActionCreators(userActions, dispatch)
});

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

export default connect(null, mapDispatch)(LoginScreen);
