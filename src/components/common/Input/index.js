import React, { useEffect } from 'react';
import { arrayOf, bool, func, oneOfType, string } from 'prop-types';
import { View, TextInput, Text } from 'react-native';
import styles from './styles';

const Input = ({ label, value, onChangeText, error, active, touched, ...props }) => {
  // Register field in the form
  useEffect(() => {
    onChangeText(value, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View>
      {label && <Text>{label}</Text>}
      <View>
        <TextInput
          style={[styles.input, active && styles.inputActive]}
          value={value}
          onChangeText={onChangeText}
          {...props}
        />
        {touched && !!error && <Text accessibilityLabel="form-error">{error}</Text>}
      </View>
    </View>
  );
};

Input.propTypes = {
  label: string,
  value: string,
  onChangeText: func.isRequired,
  error: oneOfType([arrayOf(string), string]),
  active: bool.isRequired,
  touched: bool.isRequired,
};

export default Input;
