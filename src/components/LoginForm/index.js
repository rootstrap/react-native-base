import React from 'react';
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
    formState: { errors, isDirty, isValid },
  } = useForm();

  return (
    <>
      <TextInput
        name={FIELDS.email}
        label={strings.SIGN_IN.email}
        control={control}
        rules={validations.email}
        errors={errors}
        keyboardType="email-address"
        autoCapitalize="none"
        testID="email-input"
      />
      <TextInput
        name={FIELDS.password}
        label={strings.SIGN_IN.password}
        control={control}
        rules={validations.password}
        errors={errors}
        testID="password-input"
        secureTextEntry
      />
      <ErrorView errors={{ error }} />
      <View style={styles.button}>
        <Button
          title={status === LOADING ? strings.COMMON.loading : strings.SIGN_IN.button}
          onPress={handleSubmit(onSubmit)}
          disabled={!isDirty || !isValid}
          testID="login-submit-button"
        />
      </View>
    </>
  );
};

LoginForm.propTypes = {
  onSubmit: func.isRequired,
};

export default LoginForm;
