import React from 'react';
import { Text, View } from 'react-native';

import styles from './styles';
import { SignUpNavigationProps } from './types';

const SignUpScreen: React.FunctionComponent<SignUpNavigationProps> = () => (
  <View style={styles.container}>
    <Text>Sign Up</Text>
  </View>
);

export default SignUpScreen;
