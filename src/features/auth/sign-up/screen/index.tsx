import React from 'react';
import { Text, View } from 'react-native';

import styles from './styles';
import { SignUpPropTypes } from './types';

const SignUpScreen: React.FunctionComponent<SignUpPropTypes> = () => (
  <View style={styles.container}>
    <Text>Sign Up</Text>
  </View>
);

export default SignUpScreen;
