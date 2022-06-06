import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

import { logout } from '../../actions/userActions';
import { MAIN_SCREEN } from '../../constants/screens';
import strings from '../../locale';
import useSession from '../../hooks/useSession';
import styles from './styles';
import StocksFeed from 'components/StocksFeed';
import StocksPicker from 'components/StocksPicker';

const MainScreen = () => {
    const dispatch = useDispatch();
    const logoutRequest = useCallback(() => dispatch(logout()), [dispatch]);

    return (
        <View style={styles.container} testID={MAIN_SCREEN}>
            {/* <StocksFeed></StocksFeed> */}
            <StocksPicker></StocksPicker>
        </View>
    );
};

MainScreen.navigationOptions = {
    title: strings.MAIN_SCREEN.title,
};

export default MainScreen;
