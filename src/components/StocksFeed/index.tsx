import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FlatGrid } from 'react-native-super-grid';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import memoize from 'fast-memoize';
import MultiSelect from 'react-native-multiple-select';
import { Button, Icon, Overlay } from 'react-native-elements';
import { getStockFeed, getStockConfig } from 'actions/stocksFeedActions';
import { useStockFeedState, useStockConfigState } from 'hooks/useStockFeedState';
import strings from '../../locale';
import hideWhenKeyboardOpen from '../../hooks/hideWhenKeyboardOpen';

interface StocksFeedProps {}

const StocksFeed = (props: StocksFeedProps) => {
    const dispatch = useDispatch();
    const stocksFeedRequest = useCallback(
        memoize((symbol) => () => dispatch(getStockFeed(symbol))),
        [],
    );

    // Called 'once' on init to get stock config labels
    useEffect(() => {
        dispatch(getStockConfig());
    }, [dispatch]);

    const [settingsVisible, setSettingsVisible] = useState(false);
    const [selectedConfig, setSelectedConfig] = useState([]);
    const { data } = useStockFeedState();
    const { configLabels } = useStockConfigState();

    const [items, setItems] = React.useState([
        { symbol: 'fb', code: '#1abc9c' },
        { symbol: 'aapl', code: '#2ecc71' },
        { symbol: 'amc', code: '#3498db' },
        { symbol: 'gme', code: '#9b59b6' },
        { symbol: 'tsla', code: '#34495e' },
        { symbol: 'amzn', code: '#16a085' },
        { symbol: 'nvda', code: '#27ae60' },
        { symbol: 'msft', code: '#2980b9' },
    ]);

    let selectedSymbol: string;
    // todo: move to store to allow persisting to storage or cache
    let dataConfigBySymbolMap = {};

    const getDataBySymbolKey = (data: any[], symbol: string) => {
        return data.find((item) => item.id?.toLocaleLowerCase() === symbol?.toLocaleLowerCase())
            ?.metrics;
    };

    const toggleSettings = (symbol?: string) => {
        if (symbol) {
            selectedSymbol = symbol;
        }
        setSettingsVisible(!settingsVisible);
    };

    const setSelectedSymbolConfig = (config: any) => {
        if (selectedSymbol) {
            dataConfigBySymbolMap[selectedSymbol] = config;
        }

        setSelectedConfig(config);
    };

    return (
        <View>
            <FlatGrid
                itemDimension={130}
                data={items}
                style={styles.gridView}
                spacing={10}
                renderItem={({ item }) => (
                    <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
                        <View style={styles.header}>
                            <Text
                                style={
                                    styles.itemName
                                }>{`Symbol: ${item.symbol?.toUpperCase()}`}</Text>
                            <Button
                                icon={{
                                    name: 'refresh',
                                    size: 20,
                                    color: 'white',
                                }}
                                onPress={stocksFeedRequest(item.symbol)}
                                raised={true}
                                type="clear"></Button>
                        </View>
                        {/* todo: display data keys based on dataKeysBySymbolMap[symbol] */}
                        <Text style={styles.dataLabel}>{`52 Week high: ${
                            getDataBySymbolKey(data, item.symbol)?.week52High || ''
                        }`}</Text>
                        <Text style={styles.dataLabel}>{`52 Week low: ${
                            getDataBySymbolKey(data, item.symbol)?.week52Low || ''
                        }`}</Text>
                        <View style={styles.settingsButtonContainer}>
                            <Icon
                                name="gear"
                                type="font-awesome"
                                color="white"
                                size={22}
                                onPress={() => toggleSettings(item.symbol)}
                            />
                        </View>
                    </View>
                )}
            />
            <Overlay
                isVisible={settingsVisible}
                fullScreen={true}
                style={[styles.overlayContainer]}
                onBackdropPress={toggleSettings}>
                <View style={[styles.selectContainer]}>
                    <MultiSelect
                        hideTags
                        fontFamily="roboto"
                        items={configLabels}
                        uniqueKey="id"
                        hideSubmitButton={true}
                        onSelectedItemsChange={(config) => setSelectedSymbolConfig(config)}
                        styleListContainer={[styles.selectList]}
                        selectedItems={selectedConfig}
                        selectText="Pick Items"
                        searchInputPlaceholderText="Search Items..."
                        onChangeInput={(text) => console.log(text)}
                        altFontFamily="ProximaNova-Light"
                        tagRemoveIconColor="#CCC"
                        tagBorderColor="#CCC"
                        tagTextColor="#CCC"
                        selectedItemTextColor="#CCC"
                        selectedItemIconColor="#CCC"
                        itemTextColor="#000"
                        displayKey="name"
                        searchInputStyle={{ color: '#CCC' }}
                        submitButtonColor="#CCC"
                        submitButtonText="Submit"
                    />
                </View>
                <TouchableOpacity style={[styles.selectDismiss]}>
                    {/* fixme */}
                    <View style={[styles.buttonContainer]}>
                        <Button
                            icon={<Icon name="save" size={16} color="white" />}
                            title={strings.STOCKS_FEED.submit}
                            iconRight={true}
                            onPress={() => {
                                toggleSettings();
                            }}
                            style={styles.submitButton}
                            raised={true}
                        />
                    </View>
                    {/* {hideWhenKeyboardOpen(
                        <View style={[styles.buttonContainer]}>
                            <Button
                                icon={<Icon name="save" size={16} color="white" />}
                                title={strings.STOCKS_FEED.submit}
                                iconRight={true}
                                onPress={() => {
                                    toggleSettings();
                                }}
                                style={styles.submitButton}
                                raised={true}
                            />
                        </View>,
                    )} */}
                </TouchableOpacity>
            </Overlay>
        </View>
    );
};

export default StocksFeed;

const styles = StyleSheet.create({
    gridView: {
        marginTop: 10,
        flex: 1,
    },
    buttonContainer: {
        alignSelf: 'center',
        paddingLeft: 20,
        width: 100,
        height: 20,
    },
    selectContainer: {
        flex: 6,
        backgroundColor: 'transparent',
    },
    selectDismiss: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    selectList: {
        height: 400,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
    },
    overlayContainer: {
        flexDirection: 'column',
        flex: 1,
        alignSelf: 'stretch',
        margin: 20,
    },
    overlayDismissContainer: {
        flex: 1,
    },
    settingsButtonContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'flex-end',
        marginTop: 24,
    },
    itemContainer: {
        justifyContent: 'flex-start',
        borderRadius: 5,
        padding: 10,
        height: 150,
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
    },
    dataLabel: {
        color: 'white',
    },
    submitButton: {
        alignSelf: 'center',
    },
});