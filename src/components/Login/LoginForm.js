import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, Form } from 'redux-form/immutable'
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import Input from './Input';
import * as constraints from '../../utils/constraints';

const LoginForm = ({ handleSubmit, error }) => {
  return (
    <View style={styles.login} onSubmit={handleSubmit}>
      {error && <Text>{error}</Text>}
      <Field
        name="email"
        component={Input}
      />
      <Field
        name="password"
        component={Input}
        password
      />
      <TouchableHighlight
        title="Log in"
        onPress={handleSubmit}
        underlayColor={'#57d0ef'}
        style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Log in</Text>
      </TouchableHighlight>
    </View>
);}

const styles = StyleSheet.create({
  login: {
    width: 260
  },
  loginButton: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 10,
    backgroundColor: '#57d0ea',
    borderColor: '#4aafc5',
  },
  loginButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: 'white'
  }
});

const { func, string } = PropTypes;

LoginForm.propTypes = {
  handleSubmit: func.isRequired,
  error: string
};

export default reduxForm({
  form: 'login',
  validate: constraints.validations(constraints.login)
})(LoginForm);
