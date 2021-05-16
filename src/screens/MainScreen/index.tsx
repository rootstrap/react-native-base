import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

import { logout } from '../../actions/userActions';
import { MAIN_SCREEN } from '../../constants/screens';
import strings from '../../locale';
import useSession from '../../hooks/useSession';
import styles from './styles';
import StocksFeed from 'components/StocksFeed';

const MainScreen = () => {
  const dispatch = useDispatch();
  const logoutRequest = useCallback(() => dispatch(logout()), [dispatch]);

  // const {
  //   user: { email },
  // } = useSession();

  return (
    <View style={styles.container} testID={MAIN_SCREEN}>
      <StocksFeed></StocksFeed>
    </View>
  );
};

MainScreen.navigationOptions = {
  title: strings.MAIN_SCREEN.title,
};

export default MainScreen;
