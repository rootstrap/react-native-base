import React from 'react';
import { Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import { func, object } from 'prop-types';

import SignUpForm from 'components/user/SignUpForm';
import { signUp } from 'actions/userActions';
import translate from 'utils/i18n';
import styles from './styles';

const SignUpScreen = ({ signUp, navigation }) => (
  <View style={styles.container}>
    <Text style={styles.welcome}>
      {translate('SIGN_UP.title')}
    </Text>
    <SignUpForm onSubmit={user => signUp(user.toJS())} />
    <Button
      title={translate('SIGN_IN.title')}
      onPress={navigation.pop}
    />
  </View>
);

SignUpScreen.propTypes = {
  navigation: object.isRequired,
  signUp: func.isRequired,
};

SignUpScreen.options = {
  topBar: {
    title: {
      text: translate('SIGN_UP.title')
    }
  },
};

const mapDispatch = dispatch => ({
  signUp: user => dispatch(signUp(user))
});

export default connect(null, mapDispatch)(SignUpScreen);
