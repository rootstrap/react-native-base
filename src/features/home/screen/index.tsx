import React from 'react';
import { SafeAreaView, Text } from 'react-native';

import styles from './styles';
import type { HomePropTypes } from './types';

const HomeScreen: React.FunctionComponent<HomePropTypes> = () => (
  <SafeAreaView style={styles.container}>
    <Text accessibilityRole={'text'}>Home Screen</Text>
  </SafeAreaView>
);

export default HomeScreen;
