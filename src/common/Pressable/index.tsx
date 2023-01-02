import React from 'react';
import { Pressable as RNPressable } from 'react-native';

import styles from './styles';
import { ButtonProps } from './types';

const Pressable: React.FunctionComponent<ButtonProps> = ({
  containerStyle,
  disabledStyle,
  disabled = false,
  ...props
}) => (
  <RNPressable
    accessibilityRole="button"
    style={({ pressed }) => [
      pressed ? styles.pressed : styles.notPressed,
      styles.commonContainer,
      containerStyle,
      disabled && disabledStyle,
    ]}
    disabled={disabled}
    {...props}
  />
);

export default Pressable;
