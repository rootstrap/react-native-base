import React from 'react';
import { bool, func, string } from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { ActivityIndicator, Button, Text, View } from 'react-native';

import Input from 'components/common/Input';
import * as constraints from 'utils/constraints';
import strings from 'locale';
import styles from './styles';

const SignUpForm = ({ handleSubmit, error, submitting }) => (
  <View onSubmit={handleSubmit}>
    {error && <Text>{error}</Text>}
    <Field name="email" label={strings.SIGN_UP.email} component={Input} />
    <Field name="password" label={strings.SIGN_UP.password} component={Input} password />
    <Field
      name="passwordConfirmation"
      label={strings.SIGN_UP.passwordConfirmation}
      component={Input}
      password
    />
    {submitting ? (
      <ActivityIndicator />
    ) : (
      <View style={styles.button}>
        <Button title={strings.SIGN_UP.button} onPress={handleSubmit} />
      </View>
    )}
  </View>
);

SignUpForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool.isRequired,
  error: string,
};

export default reduxForm({
  form: 'signUp',
  validate: constraints.validations(constraints.signUp),
})(SignUpForm);
