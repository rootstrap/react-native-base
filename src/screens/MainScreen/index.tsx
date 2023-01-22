import React, { useCallback, useState } from 'react';
import { View } from 'react-native';

import ConfigurationPage from 'components/ConfigurationPage';
import StocksFeed from 'components/StocksFeed';
import { MAIN_SCREEN, STOCKS_FEED, STOCK_PICKER_SCREEN } from '../../config/screens';
import strings from '../../locale';
import styles from './styles';
import { IS_CONFIGURATION_PAGE_ENABLED } from 'config/features';
import { object } from 'prop-types';

const MainScreen = ({ navigation }: any) => {

    const [configSaved, setConfigSaved] = useState(false);

    const handleConfigChange = () => {
        console.debug('Saved new API token to shared preferences..');
        setConfigSaved(true);
    };

    return (
        <View style={styles.container} testID={MAIN_SCREEN}>
            {!IS_CONFIGURATION_PAGE_ENABLED || configSaved ? (
                <StocksFeed></StocksFeed>
            ) : (
                <ConfigurationPage onConfigSaved={handleConfigChange}></ConfigurationPage>
            )}
        </View>
    );
};

MainScreen.navigationOptions = {
    title: strings.MAIN_SCREEN.title,
};

MainScreen.propTypes = {
    navigation: object.isRequired,
};

export default MainScreen;
