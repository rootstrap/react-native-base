import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { View, Text, Button } from 'react-native';

import * as constraints from 'utils/constraints';
import Input from 'components/common/Input';
import translate from 'utils/i18n';
import styles from './styles';

const SignUpForm = ({ handleSubmit, error }) => (
  <View style={styles.signUp} onSubmit={handleSubmit}>
    {error && <Text>{error}</Text>}
    <Field
      name="email"
      label={translate('SIGN_UP.email')}
      component={Input}
    />
    <Field
      name="password"
      label={translate('SIGN_UP.password')}
      component={Input}
      password
    />
    <Field
      name="passwordConfirmation"
      label={translate('SIGN_UP.passwordConfirmation')}
      component={Input}
      password
    />
    <Button title={translate('SIGN_UP.button')} onPress={handleSubmit} />
  </View>
);

const { func, string } = PropTypes;

SignUpForm.propTypes = {
  handleSubmit: func.isRequired,
  error: string
};

export default reduxForm({
  form: 'signUp',
  validate: constraints.validations(constraints.signUp)
})(SignUpForm);
