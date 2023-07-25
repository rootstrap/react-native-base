import React from 'react';
import { View } from 'react-native';

import Logo from '../components/Logo';
import styles from './styles';
import { SignInNavigationProps } from './types';

const SignInScreen: React.FunctionComponent<SignInNavigationProps> = () => (
  <View style={styles.container}>
    <Logo />
  </View>
);

export default SignInScreen;
