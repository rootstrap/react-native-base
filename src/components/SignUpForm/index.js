import React from 'react';
import { func } from 'prop-types';
import { Button, View } from 'react-native';

import Input from 'components/common/Input';
import strings from 'locale';
import useForm from 'hooks/useForm';
import useValidation from 'hooks/useValidation';
import useTextInputProps from 'hooks/useTextInputProps';
import signUpValidations from 'validations/signUpValidations';
import ErrorView from 'components/common/ErrorView';
import useStatus from 'hooks/useStatus';
import { actionTypes } from 'actions/userActions';
import { LOADING } from 'constants/status';
import styles from './styles';

const FIELDS = {
  email: 'email',
  password: 'password',
  passwordConfirmation: 'passwordConfirmation',
};

const SignUpForm = ({ onSubmit }) => {
  const { error, status } = useStatus(actionTypes.SIGN_UP);
  const validator = useValidation(signUpValidations);
  const { values, errors, handleValueChange, handleSubmit, handleBlur } = useForm(
    {
      initialValues: {},
      onSubmit,
      validator,
      validateOnBlur: true,
    },
    [onSubmit],
  );

  const inputProps = useTextInputProps(handleValueChange, handleBlur, values);

  return (
    <>
      <Input label={strings.SIGN_UP.email} {...inputProps(FIELDS.email)} />
      <Input label={strings.SIGN_UP.password} secureTextEntry {...inputProps(FIELDS.password)} />
      <Input
        label={strings.SIGN_UP.passwordConfirmation}
        secureTextEntry
        {...inputProps(FIELDS.passwordConfirmation)}
      />
      <ErrorView errors={{ ...errors, error }} />
      <View style={styles.button}>
        <Button
          title={status === LOADING ? strings.COMMON.loading : strings.SIGN_UP.button}
          onPress={handleSubmit}
        />
      </View>
    </>
  );
};

SignUpForm.propTypes = {
  onSubmit: func.isRequired,
};

export default SignUpForm;
