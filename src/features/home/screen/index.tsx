import React from 'react';
import { SafeAreaView, Text } from 'react-native';

import styles from './styles';
import type { HomeNavigationProps } from './types';

const HomeScreen: React.FunctionComponent<HomeNavigationProps> = () => (
  <SafeAreaView style={styles.container}>
    <Text accessibilityRole={'text'}>Home Screen</Text>
  </SafeAreaView>
);

export default HomeScreen;
