import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { View, Text, Button } from 'react-native';

import * as constraints from 'utils/constraints';
import Input from 'components/common/Input';
import translate from 'utils/i18n';
import styles from './styles';

const LoginForm = ({ handleSubmit, error }) => (
  <View onSubmit={handleSubmit}>
    {error && <Text>{error}</Text>}
    <Field
      name="email"
      label={translate('SIGN_IN.email')}
      component={Input}
    />
    <Field
      name="password"
      label={translate('SIGN_IN.password')}
      component={Input}
      password
    />
    <View style={styles.button}>
      <Button title={translate('SIGN_IN.button')} onPress={handleSubmit} />
    </View>
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
