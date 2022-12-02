import React from 'react';
import { View } from 'react-native';

import Logo from '../components/Logo';
import styles from './styles';
import { SignInPropTypes } from './types';

const SignInScreen: React.FunctionComponent<SignInPropTypes> = () => (
  <View style={styles.container}>
    <Logo />
  </View>
);

export default SignInScreen;
