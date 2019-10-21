import React, { useCallback } from 'react';
import { View, Text, Button } from 'react-native';
import { object } from 'prop-types';
import { useDispatch } from 'react-redux';

import { logout } from 'actions/userActions';
import strings from 'locale';
import useNavigateOnLogoutEffect from 'hooks/useNavigateOnLogoutEffect';
import useSession from 'hooks/useSession';
import styles from './styles';

const MainScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const logoutRequest = useCallback(() => dispatch(logout()), [dispatch]);

  useNavigateOnLogoutEffect(navigation);

  const {
    user: { email },
  } = useSession();

  return (
    <View style={styles.container}>
      <Text>Hey{` ${email}` || ''}, you&#39;re logged in!</Text>
      <Button onPress={logoutRequest} title={strings.MAIN_SCREEN.logout} />
    </View>
  );
};

MainScreen.options = {
  topBar: {
    title: {
      text: strings.MAIN_SCREEN.title,
    },
  },
};

MainScreen.propTypes = {
  navigation: object.isRequired,
};

export default MainScreen;
