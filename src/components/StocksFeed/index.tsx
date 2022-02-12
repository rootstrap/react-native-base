import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FlatGrid } from 'react-native-super-grid';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import memoize from 'fast-memoize';
import MultiSelect from 'react-native-multiple-select';
import { Button, Icon, Overlay } from 'react-native-elements';
import {
    getStockFeed,
    getStockConfig,
    getStockSymbols,
    getAllStocksFeed,
} from 'actions/stocksFeedActions';
import {
    useStockFeedState,
    useStockConfigState,
    useStockSymbolsState,
} from 'hooks/useStockFeedState';
import strings from '../../locale';
import { startCase } from 'lodash';
import useHideWhenKeyboardOpen from 'hooks/useHideWhenKeyboardOpen';
import useStockFormatUtils from 'hooks/useStockFormatUtils';
import { ES_GREEN, ES_PINK, ES_PURPLE } from 'constants/colors';

interface StocksFeedProps {}

const StocksFeed = (props: StocksFeedProps) => {
    const dispatch = useDispatch();
    const stocksFeedRequest = useCallback(
        memoize((symbol) => () => dispatch(getStockFeed(symbol))),
        [],
    );

    // Called 'once' on init to get view data
    useEffect(() => {
        dispatch(getStockConfig());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getStockSymbols());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAllStocksFeed({ symbolCodes }));
    }, [dispatch]);

    const { data } = useStockFeedState();
    const { configLabels } = useStockConfigState();
    const { symbolCodes } = useStockSymbolsState();

    const [defaultConfig] = useState(['open', 'week52High', 'week52Low']);
    let defaultConfigBySymbol = symbolCodes.map((item: { symbol: any }) => ({
        stockKey: item.symbol,
        labelValues: [...defaultConfig],
    }));
    //reduce array to single opbject
    const defaultStockLabels = defaultConfigBySymbol.reduce(
        (config: any, item: { stockKey: any; labelValues: any }) =>
            Object.assign(config, { [item.stockKey]: item.labelValues }),
        {},
    );

    const [settingsVisible, setSettingsVisible] = useState(false);
    const [selectedSymbol, setSelectedSymbol] = useState('');
    // todo: push state to store
    const [configBySymbolMap, setConfigBySymbolMap] = useState({ ...defaultStockLabels });
    const [companyTickerSymbols] = React.useState([...symbolCodes]);

    const toggleSettings = (symbol?: string) => {
        if (symbol) {
            setSelectedSymbol(symbol);
        }
        setSettingsVisible(!settingsVisible);
    };

    const resetDefaultSymbolLabels = (symbol?: string) => {
        if (symbol) {
            setConfigBySymbolMap({ ...configBySymbolMap, [symbol]: [...defaultConfig] });
        }
    };

    const setSelectedSymbolConfig = (config: string[]) => {
        if (selectedSymbol) {
            setConfigBySymbolMap({ ...configBySymbolMap, [selectedSymbol]: config });
        }
    };

    function Metric(props: any) {
        const data = props.data;
        const symbolItem = props.item;
        const configLabel = props.configLabel;
        const styles = props.styles;

        if (data && symbolItem && configLabel) {
            return (
                <View style={styles.metricContainer}>
                    <Text style={styles.dataLabel}>
                        {`${startCase(configLabel)}: `}
                        <Text style={styles.dataLabel}>{`${
                            useStockFormatUtils().getMetricBySymbolKey(
                                data,
                                symbolItem?.symbol,
                                configLabel,
                            ) || ''
                        }`}</Text>
                    </Text>
                </View>
            );
        }
        return null;
    }

    const isKeyboardShown = useHideWhenKeyboardOpen();

    return (
        <View>
            <FlatGrid
                itemDimension={130}
                data={companyTickerSymbols}
                style={styles.gridView}
                spacing={10}
                testID="tile-grid"
                renderItem={({ item }) => {
                    return (
                        <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
                            <View style={[styles.itemContent, { backgroundColor: item.code }]}>
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
                                {configBySymbolMap[item.symbol]?.length
                                    ? configBySymbolMap[item.symbol].map(
                                          (configLabel: string, index: number) => (
                                              <Metric
                                                  styles={styles}
                                                  key={index}
                                                  data={data}
                                                  configLabel={configLabel}
                                                  item={item}
                                              />
                                          ),
                                      )
                                    : null}
                            </View>
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
                    );
                }}
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
                        // todo: clear all selected items
                        items={configLabels}
                        uniqueKey="name"
                        hideSubmitButton={true}
                        onSelectedItemsChange={(config) => setSelectedSymbolConfig(config)}
                        styleListContainer={[styles.selectList]}
                        selectedItems={configBySymbolMap[selectedSymbol]}
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
                    <View style={[styles.buttonContainer]}>
                        {!isKeyboardShown && (
                            <>
                                <Button
                                    icon={<Icon name="save" size={16} color="white" />}
                                    title={strings.STOCKS_FEED.submit}
                                    iconRight={true}
                                    onPress={() => {
                                        toggleSettings();
                                    }}
                                    style={styles.submitButton}
                                    buttonStyle={styles.submitButtonColor}
                                    containerStyle={styles.submitButtonColor}
                                    raised={true}
                                />
                                <View style={styles.space} />
                                <Button
                                    icon={<Icon name="clear" size={16} color="white" />}
                                    title={strings.STOCKS_FEED.reset}
                                    iconRight={true}
                                    onPress={() => {
                                        resetDefaultSymbolLabels(selectedSymbol);
                                    }}
                                    style={styles.submitButton}
                                    buttonStyle={styles.cancelButtonColor}
                                    containerStyle={styles.cancelButtonColor}
                                />
                            </>
                        )}
                    </View>
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
        backgroundColor: ES_GREEN,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    selectContainer: {
        flex: 6,
        backgroundColor: ES_GREEN,
    },
    selectDismiss: {
        flex: 1,
        backgroundColor: ES_GREEN,
    },
    space: {
        width: 20,
        height: 20,
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
    metricContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    overlayContainer: {
        flexDirection: 'column',
        flex: 1,
        alignSelf: 'stretch',
        margin: 20,
        backgroundColor: ES_GREEN,
    },
    overlayDismissContainer: {
        flex: 1,
    },
    settingsButtonContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'flex-end',
        marginTop: 0,
        marginRight: 12.3,
    },
    itemContainer: {
        justifyContent: 'flex-start',
        borderRadius: 5,
        padding: 10,
        minHeight: 160,
        flex: 1,
    },
    itemContent: {
        justifyContent: 'flex-start',
        flex: 1,
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
        fontWeight: 'bold',
        margin: 2,
    },
    submitButton: {
        alignSelf: 'center',
        backgroundColor: ES_PURPLE,
    },
    submitButtonColor: {
        alignSelf: 'center',
        backgroundColor: ES_PURPLE,
    },
    cancelButtonColor: {
        alignSelf: 'center',
        backgroundColor: ES_PINK,
        paddingLeft: 15,
    },
});
