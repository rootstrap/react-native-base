import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { object } from 'prop-types';
import styles from './styles';

const ErrorView = ({ errors = {} }) => {
  const errorMessages: any = Object.values(errors)
    .filter(error => !!error)
    .reduce((acc: any, error) => {
      acc.push(error);
      return acc;
    }, []);
  if (!errorMessages.length) return null;

  return (
    <View style={styles.container}>
      {errorMessages.map((error: string) => (
        <Text key={error} accessibilityLabel="form-error" style={styles.error}>
          {error}
        </Text>
      ))}
    </View>
  );
};

ErrorView.propTypes = {
  errors: object,
};

ErrorView.defaultProps = {
  errors: {},
};

export default memo(ErrorView);
