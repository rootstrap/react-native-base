import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const Input = ({ input: { onChange, ...restInput }, password = false, label, meta: { touched, error } }) => (
  <View>
    {label && <Text>{label}</Text>}
    <View>
      <TextInput style={styles.input} onChangeText={onChange} {...restInput} secureTextEntry={password} />
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

const styles = StyleSheet.create({
  input: {
    height: 40,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 5
  }
});

export default Input;
