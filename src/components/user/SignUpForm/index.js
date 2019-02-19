import React from 'react';
import { func, string, bool } from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { View, Text, Button, ActivityIndicator } from 'react-native';

import * as constraints from 'utils/constraints';
import Input from 'components/common/Input';
import translate from 'utils/i18n';
import styles from './styles';

const SignUpForm = ({ handleSubmit, error, submitting }) => (
  <View onSubmit={handleSubmit}>
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
    { submitting ?
      <ActivityIndicator /> :
      <View style={styles.button}>
        <Button title={translate('SIGN_UP.button')} onPress={handleSubmit} />
      </View>
    }
  </View>
);

SignUpForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool.isRequired,
  error: string
};

export default reduxForm({
  form: 'signUp',
  validate: constraints.validations(constraints.signUp)
})(SignUpForm);
