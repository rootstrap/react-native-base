import React, { useCallback } from 'react';
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
    getValues,
    handleSubmit,
    setFocus,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: 'all',
  });

  const disabled = !isDirty || !isValid;

  const onEmailSubmitEditing = useCallback(() => setFocus(FIELDS.password), [setFocus]);
  const onPasswordSubmitEditing = useCallback(() => setFocus(FIELDS.passwordConfirmation), [
    setFocus,
  ]);

  const onConfirmationPasswordSubmitEditing = useCallback(
    () => !disabled && handleSubmit(onSubmit),
    [disabled, handleSubmit, onSubmit],
  );

  return (
    <>
      <TextInput
        testID="email-input"
        name={FIELDS.email}
        label={strings.SIGN_UP.email}
        control={control}
        rules={validations.email}
        errors={errors}
        onSubmitEditing={onEmailSubmitEditing}
        keyboardType="email-address"
        autoCapitalize="none"
        required
      />
      <TextInput
        testID="password-input"
        name={FIELDS.password}
        label={strings.SIGN_UP.password}
        control={control}
        rules={validations.password}
        errors={errors}
        onSubmitEditing={onPasswordSubmitEditing}
        secureTextEntry
        required
      />
      <TextInput
        testID="confirm-password-input"
        name={FIELDS.passwordConfirmation}
        label={strings.SIGN_UP.passwordConfirmation}
        control={control}
        rules={validations.passwordConfirmation(getValues(FIELDS.password))}
        errors={errors}
        onSubmitEditing={onConfirmationPasswordSubmitEditing}
        returnKeyType="done"
        secureTextEntry
        required
      />
      <ErrorView errors={{ error }} />
      <View style={styles.button}>
        <Button
          testID="signup-submit-button"
          title={status === LOADING ? strings.COMMON.loading : strings.SIGN_UP.button}
          onPress={handleSubmit(onSubmit)}
          disabled={disabled}
        />
      </View>
    </>
  );
};

SignUpForm.propTypes = {
  onSubmit: func.isRequired,
};

export default SignUpForm;
