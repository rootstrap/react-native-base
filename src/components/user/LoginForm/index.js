import React from 'react';
import { bool, func, string } from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import {
  ActivityIndicator, Button, Text, View,
} from 'react-native';

import Input from 'components/common/Input';
import * as constraints from 'utils/constraints';
import translate from 'utils/i18n';
import styles from './styles';

const LoginForm = ({ handleSubmit, error, submitting }) => (
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
    { submitting ?
      <ActivityIndicator /> :
      <View style={styles.button}>
        <Button
          title={translate('SIGN_IN.button')}
          onPress={handleSubmit}
        />
      </View>
    }
  </View>
);

LoginForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool.isRequired,
  error: string
};

export default reduxForm({
  form: 'login',
  validate: constraints.validations(constraints.login)
})(LoginForm);
