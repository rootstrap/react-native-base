import React, { useState, forwardRef } from 'react';
import { View, TextInput as RNTextInput } from 'react-native';
import { bool, func, shape, string } from 'prop-types';

import Text from 'components/common/Text';

import { inputA11yHint } from 'utils/accessibility';

import InputLabel from '../InputLabel';
import ErrorMessage from '../ErrorMessage';

import withController from '../withController';

import styles from './TextInput.style';

const TextInput = forwardRef(
  (
    {
      label,
      value,
      onChange,
      onBlur,
      accessibilityLabel,
      accessibilityHint = '',
      returnKeyType = 'next',
      error,
      required = false,
      onSubmitEditing,
      ...otherProps
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleOnFocus = () => setIsFocused(true);
    const handleOnBlur = () => {
      setIsFocused(false);
      onBlur();
    };

    return (
      <View style={styles.container}>
        <InputLabel text={label} withRequiredIndicator={required} />
        <View>
          <RNTextInput
            {...otherProps}
            ref={ref}
            accessible
            style={[styles.input, isFocused && styles.inputFocused, error && styles.inputWithError]}
            value={value}
            onChangeText={text => onChange(text)}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            accessibilityLabel={accessibilityLabel || label}
            accessibilityHint={inputA11yHint(accessibilityHint, required)}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
          />
          {!!error && (
            <View style={styles.errorIndicator}>
              <Text style={styles.error} accessible={false} pointerEvents="none">
                X
              </Text>
            </View>
          )}
        </View>
        {!!error && <ErrorMessage message={error?.message} />}
      </View>
    );
  },
);

TextInput.propTypes = {
  label: string.isRequired,
  value: string,
  onChange: func.isRequired,
  onBlur: func,
  accessibilityLabel: string,
  accessibilityHint: string,
  returnKeyType: string,
  error: shape({ message: string.isRequired }),
  required: bool,
  onSubmitEditing: func,
};

export default withController(TextInput);
