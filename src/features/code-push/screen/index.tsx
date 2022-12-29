import React from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';

import useCodePush from 'features/code-push/hooks/useCodePush';

import styles from './styles';

const SplashLogo = require('assets/images/bootsplash_logo.png');

const InAppSplash = () => {
  const { isLoading } = useCodePush();

  return (
    <View style={styles.container}>
      <Image source={SplashLogo} style={styles.logo} />
      <View style={styles.messageContainer}>
        <Text style={styles.updateMessage}>We are updating the app, please wait</Text>
        {isLoading && <ActivityIndicator size={'small'} color="#FFF" />}
      </View>
    </View>
  );
};

export default InAppSplash;
