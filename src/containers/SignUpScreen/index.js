import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, Button } from 'react-native';
import { connect } from 'react-redux';

import SignUpForm from 'components/user/SignUpForm';
import { signUp } from 'actions/userActions';
import translate from 'utils/i18n';
import styles from './styles';

const SignUpScreen = ({ signUp, navigator }) => (
  <View style={styles.container}>
    <Text style={styles.welcome}>
      {translate('SIGN_UP.title')}
    </Text>
    <SignUpForm onSubmit={user => signUp(user.toJS())} />
    <Button
      title={translate('SIGN_IN.title')} onPress={() => navigator.pop()}
    />
  </View>
);

const { func } = PropTypes;

SignUpScreen.propTypes = {
  signUp: func.isRequired
};

SignUpScreen.navigationOptions = {
  title: 'Sign Up'
};

const mapDispatch = dispatch => ({
  signUp: user => dispatch(signUp(user))
});

export default connect(null, mapDispatch)(SignUpScreen);
