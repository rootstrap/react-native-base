import React, { useCallback } from 'react';
import { func } from 'prop-types';
import { Button, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { useStatus, LOADING } from '@rootstrap/redux-tools';

import { login } from 'actions/userActions';

import ErrorView from 'components/common/ErrorView';
import TextInput from 'components/form/TextInput';

import strings from 'localization';
import validations from 'validations/loginValidations';

import styles from './styles';

const FIELDS = {
  email: 'email',
  password: 'password',
};

const LoginForm = ({ onSubmit }) => {
  const { error, status } = useStatus(login);

  const {
    control,
    handleSubmit,
    setFocus,
    formState: { errors, isDirty, isValid },
  } = useForm();

  const disabled = !isDirty || !isValid;

  const onEmailSubmitEditing = useCallback(() => setFocus(FIELDS.password), [setFocus]);
  const onPasswordSubmitEditing = useCallback(() => !disabled && handleSubmit(onSubmit), [
    disabled,
    handleSubmit,
    onSubmit,
  ]);

  return (
    <>
      <TextInput
        testID="email-input"
        name={FIELDS.email}
        label={strings.SIGN_IN.email}
        control={control}
        rules={validations.email}
        errors={errors}
        onSubmitEditing={onEmailSubmitEditing}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        testID="password-input"
        name={FIELDS.password}
        label={strings.SIGN_IN.password}
        control={control}
        rules={validations.password}
        errors={errors}
        onSubmitEditing={onPasswordSubmitEditing}
        returnKeyType="done"
        secureTextEntry
      />
      <ErrorView errors={{ error }} />
      <View style={styles.button}>
        <Button
          testID="login-submit-button"
          title={status === LOADING ? strings.COMMON.loading : strings.SIGN_IN.button}
          onPress={handleSubmit(onSubmit)}
          disabled={disabled}
        />
      </View>
    </>
  );
};

LoginForm.propTypes = {
  onSubmit: func.isRequired,
};

export default LoginForm;
