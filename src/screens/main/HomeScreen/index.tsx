import React from 'react';
import { SafeAreaView, Text } from 'react-native';

import { AppScreens, NativeStackScreenProps, StackParamList } from 'navigation/types';

import styles from './styles';

interface PropTypes extends NativeStackScreenProps<StackParamList, AppScreens.Home> {}

const HomeScreen: React.FunctionComponent<PropTypes> = () => (
  <SafeAreaView style={styles.container}>
    <Text accessibilityRole={'text'}>Home Screen</Text>
  </SafeAreaView>
);

export default HomeScreen;
