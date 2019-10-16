import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { object } from 'prop-types';
import useSessionChangeEffect from 'hooks/useSessionChangeEffect';
import { LOGIN_SCREEN, MAIN_SCREEN } from 'constants/screens';
import { WHITE } from 'constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE,
  },
});

export default function AppLoader({ navigation }) {
  useSessionChangeEffect(
    ({ user, info }) => {
      if (user && info) {
        navigation.navigate(MAIN_SCREEN);
      } else {
        navigation.navigate(LOGIN_SCREEN);
      }
    },
    [navigation],
  );

  return (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  );
}

AppLoader.propTypes = {
  navigation: object.isRequired,
};
