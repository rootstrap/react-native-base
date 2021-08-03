import React from 'react';
import { func } from 'prop-types';
import { Button, View } from 'react-native';
import { useStatus, LOADING } from '@rootstrap/redux-tools';

import { signUp } from 'actions/userActions';
import Input from 'components/common/Input';
import strings from 'localization';
import useForm from 'hooks/useForm';
import useValidation from 'hooks/useValidation';
import useTextInputProps from 'hooks/useTextInputProps';
import signUpValidations from 'validations/signUpValidations';
import ErrorView from 'components/common/ErrorView';
import styles from './styles';

const FIELDS = {
  email: 'email',
  password: 'password',
  passwordConfirmation: 'passwordConfirmation',
};

const SignUpForm = ({ onSubmit }) => {
  const { error, status } = useStatus(signUp);
  const validator = useValidation(signUpValidations);
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
        label={strings.SIGN_UP.email}
        keyboardType="email-address"
        autoCapitalize="none"
        testID="email-input"
        {...inputProps(FIELDS.email)}
      />
      <Input
        label={strings.SIGN_UP.password}
        secureTextEntry
        testID="password-input"
        {...inputProps(FIELDS.password)}
      />
      <Input
        label={strings.SIGN_UP.passwordConfirmation}
        secureTextEntry
        testID="confirm-password-input"
        {...inputProps(FIELDS.passwordConfirmation)}
      />
      <ErrorView errors={{ error }} />
      <View style={styles.button}>
        <Button
          testID="signup-submit-button"
          title={status === LOADING ? strings.COMMON.loading : strings.SIGN_UP.button}
          onPress={handleSubmit}
          disabled={formHasErrors}
        />
      </View>
    </>
  );
};

SignUpForm.propTypes = {
  onSubmit: func.isRequired,
};

export default SignUpForm;
