import React, { useEffect } from 'react';
import { View, TextInput, Text } from 'react-native';
import styles from './styles';

interface Props {
  label: string;
  value: string;
  onChangeText: Function;
  error: string[];
  active: boolean;
  touched: boolean;
}

const Input: React.FC<Props> = ({
  label,
  value,
  onChangeText,
  error,
  active,
  touched,
  ...props
}: any) => {
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

export default Input;
