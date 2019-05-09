import React from 'react';
import { Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { func, string } from 'prop-types';

import SignUpForm from 'components/user/SignUpForm';
import { signUp } from 'actions/userActions';
import translate from 'utils/i18n';
import styles from './styles';

const SignUpScreen = ({ signUp, componentId }) => (
  <View style={styles.container}>
    <Text style={styles.welcome}>
      {translate('SIGN_UP.title')}
    </Text>
    <SignUpForm onSubmit={user => signUp(user.toJS())} />
    <Button
      title={translate('SIGN_IN.title')}
      onPress={() => Navigation.pop(componentId)}
    />
  </View>
);

SignUpScreen.propTypes = {
  signUp: func.isRequired,
  componentId: string.isRequired,
};

SignUpScreen.navigationOptions = {
  title: translate('SIGN_UP.title')
};

const mapDispatch = dispatch => ({
  signUp: user => dispatch(signUp(user))
});

export default connect(null, mapDispatch)(SignUpScreen);
