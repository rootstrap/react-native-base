import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FlatGrid } from 'react-native-super-grid';
import { View, Text, StyleSheet } from 'react-native';
import strings from 'locale';
import memoize from 'fast-memoize';
import MultiSelect from 'react-native-multiple-select';
import { Button, Icon, Overlay } from 'react-native-elements';
import { getStockFeed } from 'actions/stocksFeedActions';

import useStockFeedState from 'hooks/useStockFeedState';

interface StocksFeedProps {}

const StocksFeed = (props: StocksFeedProps) => {
    const dispatch = useDispatch();
    const stocksFeedRequest = React.useCallback(
        memoize((symbol) => () => dispatch(getStockFeed(symbol))),
        [],
    );

    const [settingsVisible, setSettingsVisible] = useState(false);

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

    const [settingsOptions, setSettingsOptions] = React.useState([{ id: 0, name: 'none' }]);

    let settingsList: Object[] = [];

    useEffect(() => {
        let mappedOptions = data?.length
            ? Object.keys(data[0]?.metrics).map((key, index) => ({
                  id: `${index}-${key}`,
                  name: key,
              }))
            : [];
        // setSettingsOptions(mappedOptions);
        if (!settingsList?.length) {
            settingsList = mappedOptions;
            console.log(settingsList);
        }
    }, [settingsList]);

    const { data } = useStockFeedState();

    let selectedSymbol: string;
    let dataKeysBySymbolMap = {};

    const getDataBySymbolKey = (data: any[], symbol: string) => {
        return data.find((item) => item.id.toLocaleLowerCase() === symbol.toLocaleLowerCase())
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
            dataKeysBySymbolMap[selectedSymbol] = config;
        }
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
                        <Text
                            style={styles.itemName}>{`Symbol: ${item.symbol?.toUpperCase()}`}</Text>
                        <Button
                            icon={{
                                name: 'refresh',
                                size: 15,
                                color: 'white',
                            }}
                            onPress={stocksFeedRequest(item.symbol)}
                            raised={true}
                            type="clear"></Button>
                        {/* todo: display data keys based on dataKeysBySymbolMap[symbol] */}
                        <Text>{`52 Week high: ${
                            getDataBySymbolKey(data, item.symbol)?.week52High || ''
                        }`}</Text>
                        <Text>{`52 Week low: ${
                            getDataBySymbolKey(data, item.symbol)?.week52Low || ''
                        }`}</Text>
                        <Icon
                            name="gear"
                            type="font-awesome"
                            color="white"
                            onPress={() => toggleSettings(item.symbol)}
                        />
                    </View>
                )}
            />
            <Overlay
                isVisible={settingsVisible}
                fullScreen={true}
                style={[styles.overlayContainer]}
                onBackdropPress={toggleSettings}>
                <View style={[styles.overlayContainer]}>
                    <MultiSelect
                        hideTags
                        items={settingsList}
                        uniqueKey="id"
                        onSelectedItemsChange={setSelectedSymbolConfig}
                        //selectedItems={selectedDataKeys}
                        selectText="Pick Labels"
                        searchInputPlaceholderText="Search labels..."
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
                    <Text>{JSON.stringify(settingsList)}</Text>
                </View>
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
    overlayContainer: {
        flex: 0.9,
        alignSelf: 'stretch',
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
});
