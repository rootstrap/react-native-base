import React from 'react';
import { string } from 'prop-types';
import { View, TextInput, Text } from 'react-native';
import styles from './styles';

const Input = ({ label, error, ...props }) => (
  <View>
    {label && <Text>{label}</Text>}
    <View>
      <TextInput style={styles.input} {...props} />
      {error && <Text>{error}</Text>}
    </View>
  </View>
);

Input.propTypes = {
  label: string,
  error: string,
};

export default Input;
