import React from 'react';
import { func } from 'prop-types';
import { Button, View } from 'react-native';

import Input from 'components/common/Input';
import useForm from 'hooks/useForm';
import useValidation from 'hooks/useValidation';
import loginValidations from 'validations/loginValidations';
import ErrorView from 'components/common/ErrorView';
import useTextInputProps from 'hooks/useTextInputProps';
import useStatus from 'hooks/useStatus';
import { actionTypes } from 'actions/userActions';
import { LOADING } from 'constants/status';
import strings from 'locale';
import styles from './styles';

const FIELDS = {
  email: 'email',
  password: 'password',
};

const LoginForm = ({ onSubmit }) => {
  const { error, status } = useStatus(actionTypes.LOGIN);
  const validator = useValidation(loginValidations);
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
      <Input label={strings.SIGN_IN.email} {...inputProps(FIELDS.email)} />
      <Input label={strings.SIGN_IN.password} secureTextEntry {...inputProps(FIELDS.password)} />
      <ErrorView errors={{ ...errors, error }} />
      <View style={styles.button}>
        <Button
          title={status === LOADING ? strings.COMMON.loading : strings.SIGN_IN.button}
          onPress={handleSubmit}
        />
      </View>
    </>
  );
};

LoginForm.propTypes = {
  onSubmit: func.isRequired,
};

export default LoginForm;
