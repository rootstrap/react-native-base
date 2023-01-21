import React from 'react';
import { View } from 'react-native';

import ConfigurationPage from 'components/ConfigurationPage';
import StocksFeed from 'components/StocksFeed';
import { MAIN_SCREEN } from '../../config/screens';
import strings from '../../locale';
import styles from './styles';
import { IS_CONFIGURATION_PAGE_ENABLED } from 'config/features';


const MainScreen = () => {
    return (
        <View style={styles.container} testID={MAIN_SCREEN}>
            {!IS_CONFIGURATION_PAGE_ENABLED ? (
                <StocksFeed></StocksFeed>
            )  : (
                <ConfigurationPage></ConfigurationPage>
            )}
        </View>
    );
};

MainScreen.navigationOptions = {
    title: strings.MAIN_SCREEN.title,
};

export default MainScreen;
