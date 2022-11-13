import React from 'react';
import { View } from 'react-native';
import strings from '../../locale';
import styles from './styles';
import StocksPicker from 'components/StocksPicker';
import { STOCK_PICKER_SCREEN } from '../../config/screens';


const SettingsScreen = () => {
    return (
        <View style={styles.container} testID={STOCK_PICKER_SCREEN}>  
                <StocksPicker></StocksPicker>
        </View>
    );
};

SettingsScreen.navigationOptions = {
    title: strings.STOCKS_PICKER.title,
};

export default SettingsScreen;
