import React from 'react';
import { View } from 'react-native';

import { MAIN_SCREEN } from '../../constants/screens';
import strings from '../../locale';
import styles from './styles';
import StocksFeed from 'components/StocksFeed';


const MainScreen = () => {
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
