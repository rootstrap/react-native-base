import React from 'react';
import { func } from 'prop-types';
import { Button, View } from 'react-native';
import { useStatus, LOADING } from '@rootstrap/redux-tools';

import { login } from 'actions/userActions';
import Input from 'components/common/Input';
import useForm from 'hooks/useForm';
import useValidation from 'hooks/useValidation';
import loginValidations from 'validations/loginValidations';
import ErrorView from 'components/common/ErrorView';
import useTextInputProps from 'hooks/useTextInputProps';
import strings from 'localization';
import styles from './styles';

const FIELDS = {
  email: 'email',
  password: 'password',
};

const LoginForm = ({ onSubmit }) => {
  const { error, status } = useStatus(login);
  const validator = useValidation(loginValidations);
  const {
    values,
    errors,
    handleValueChange,
    handleSubmit,
    handleFocus,
    handleBlur,
    activeFields,
    touched,
    formHasErrors,
  } = useForm(
    {
      onSubmit,
      validator,
      validateOnBlur: true,
      validateOnChange: true,
    },
    [onSubmit],
  );

  const inputProps = useTextInputProps(
    handleValueChange,
    handleFocus,
    handleBlur,
    values,
    errors,
    activeFields,
    touched,
  );

  return (
    <>
      <Input
        label={strings.SIGN_IN.email}
        keyboardType="email-address"
        autoCapitalize="none"
        testID="email-input"
        {...inputProps(FIELDS.email)}
      />
      <Input
        label={strings.SIGN_IN.password}
        testID="password-input"
        secureTextEntry
        {...inputProps(FIELDS.password)}
      />
      <ErrorView errors={{ error }} />
      <View style={styles.button}>
        <Button
          testID="login-submit-button"
          title={status === LOADING ? strings.COMMON.loading : strings.SIGN_IN.button}
          onPress={handleSubmit}
          disabled={formHasErrors}
        />
      </View>
    </>
  );
};

LoginForm.propTypes = {
  onSubmit: func.isRequired,
};

export default LoginForm;
