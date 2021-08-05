import React from 'react';
import { Button, View } from 'react-native';
import { func } from 'prop-types';
import { useForm } from 'react-hook-form';
import { useStatus, LOADING } from '@rootstrap/redux-tools';

import { signUp } from 'actions/userActions';

import TextInput from 'components/form/TextInput';
import ErrorView from 'components/common/ErrorView';

import validations from 'validations/signUpValidations';

import strings from 'localization';

import styles from './styles';

const FIELDS = {
  email: 'email',
  password: 'password',
  passwordConfirmation: 'passwordConfirmation',
};

const SignUpForm = ({ onSubmit }) => {
  const { error, status } = useStatus(signUp);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm();

  return (
    <>
      <TextInput
        name={FIELDS.email}
        label={strings.SIGN_UP.email}
        control={control}
        rules={validations.email}
        errors={errors}
        keyboardType="email-address"
        autoCapitalize="none"
        testID="email-input"
      />
      <TextInput
        name={FIELDS.password}
        label={strings.SIGN_UP.password}
        control={control}
        rules={validations.password}
        errors={errors}
        secureTextEntry
        testID="password-input"
      />
      <TextInput
        name={FIELDS.passwordConfirmation}
        label={strings.SIGN_UP.passwordConfirmation}
        control={control}
        rules={validations.passwordConfirmation}
        errors={errors}
        secureTextEntry
        testID="confirm-password-input"
      />
      <ErrorView errors={{ error }} />
      <View style={styles.button}>
        <Button
          testID="signup-submit-button"
          title={status === LOADING ? strings.COMMON.loading : strings.SIGN_UP.button}
          onPress={handleSubmit(onSubmit)}
          disabled={!isDirty || !isValid}
        />
      </View>
    </>
  );
};

SignUpForm.propTypes = {
  onSubmit: func.isRequired,
};

export default SignUpForm;
