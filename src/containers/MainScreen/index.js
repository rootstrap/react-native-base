import React, { useCallback } from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch } from 'react-redux';

import { logout } from 'actions/userActions';
import translate from 'utils/i18n';
import useSession from 'hooks/useSession';
import styles from './styles';

const MainScreen = () => {
  const dispatch = useDispatch();

  const logoutRequest = useCallback(
    () => dispatch(logout()),
    [dispatch]
  );

  const { user: { email } } = useSession();
  return (
    <View style={styles.container}>
      <Text>Hey {email}, you&#39;re logged in!</Text>
      <Button
        onPress={logoutRequest}
        title={translate('MAIN_SCREEN.logout')}
      />
    </View>
  );
};

MainScreen.options = {
  topBar: {
    title: {
      text: translate('MAIN_SCREEN.title')
    }
  },
};

export default MainScreen;
