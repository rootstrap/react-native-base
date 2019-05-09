import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, Text } from 'react-native';
import styles from './styles';

const Input = ({ input: { onChange, ...restInput }, password = false, label, meta: { touched, error } }) => (
  <View>
    {label && <Text>{label}</Text>}
    <View>
      <TextInput
        style={styles.input}
        onChangeText={onChange}
        secureTextEntry={password}
        {...restInput}
      />
      {touched && error && <Text>{error}</Text>}
    </View>
  </View>
);

const { string, object, bool } = PropTypes;

Input.propTypes = {
  input: object.isRequired,
  label: string,
  meta: object,
  password: bool
};

export default Input;
