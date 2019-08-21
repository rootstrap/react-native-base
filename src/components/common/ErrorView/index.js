import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { object } from 'prop-types';
import styles from './styles';

const ErrorView = ({ errors }) => {
  const errorMessages = Object.values(errors).flat();
  if (!errorMessages.length) return null;
  return (
    <View style={styles.container}>
      {errorMessages.map(error => (
        <Text key={error} style={styles.error}>
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
