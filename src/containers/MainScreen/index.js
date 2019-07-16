import React, { useCallback } from 'react';
import { View, Text, Button } from 'react-native';
import { object } from 'prop-types';
import { useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';

import { logout } from 'actions/userActions';
import translate from 'utils/i18n';
import useSessionChangeEffect from 'hooks/useSessionChangeEffect';
import { LOGIN_SCREEN } from 'constants/screens';
import useSession from 'hooks/useSession';
import styles from './styles';

const MainScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const logoutRequest = useCallback(() => dispatch(logout()), [dispatch]);

  useSessionChangeEffect(
    user => {
      const userLoggedIn = !isEmpty(user);
      if (!userLoggedIn) {
        navigation.navigate(LOGIN_SCREEN);
      }
    },
    [navigation]
  );

  const {
    user: { email },
  } = useSession();
  return (
    <View style={styles.container}>
      <Text>Hey {email}, you&#39;re logged in!</Text>
      <Button onPress={logoutRequest} title={translate('MAIN_SCREEN.logout')} />
    </View>
  );
};

MainScreen.options = {
  topBar: {
    title: {
      text: translate('MAIN_SCREEN.title'),
    },
  },
};

MainScreen.propTypes = {
  navigation: object.isRequired,
};

export default MainScreen;
