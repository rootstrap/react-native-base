import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { View, Text, Button, StyleSheet } from 'react-native';

import Input from '../common/Input';
import * as constraints from '../../utils/constraints';

const styles = StyleSheet.create({
  login: {
    width: 230
  }
});

const LoginForm = ({ handleSubmit, error }) => (
  <View style={styles.login} onSubmit={handleSubmit}>
    {error && <Text>{error}</Text>}
    <Field
      name="email"
      label="Email"
      component={Input}
    />
    <Field
      name="password"
      label="Password"
      component={Input}
      password
    />
    <Button title="LOGIN" onPress={handleSubmit} />
  </View>
);

const { func, string } = PropTypes;

LoginForm.propTypes = {
  handleSubmit: func.isRequired,
  error: string
};

export default reduxForm({
  form: 'login',
  validate: constraints.validations(constraints.login)
})(LoginForm);
