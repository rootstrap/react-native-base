import React from 'react';
import { SafeAreaView, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import Button from 'common/Button';

import { MainStackScreens } from 'navigation/stacks/main';

import useStyles from './styles';
import type { HomeNavigationProps } from './types';

const HomeScreen: React.FunctionComponent<HomeNavigationProps> = () => {
  const styles = useStyles();
  const { navigate } = useNavigation();
  const goToSettings = () => navigate(MainStackScreens.Settings);

  return (
    <SafeAreaView style={styles.container}>
      <Text accessibilityRole={'text'} style={styles.title}>
        Home Screen
      </Text>
      <Button
        accessibilityState={{ disabled: false }}
        title={'⚙️'}
        onPress={goToSettings}
        style={styles.button}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
