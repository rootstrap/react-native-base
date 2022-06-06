import {
    getAllStocksFeed,
    getAllStockTickerSymbols,
    getStockConfig,
    getStockSymbols,
    updateSelectedMetrics,
} from 'actions/stocksFeedActions';
import { ES_BLUE, ES_GREEN, ES_PINK } from 'constants/colors';
import memoize from 'fast-memoize';
import {
    useAllStockSymbolsState,
    useConfigBySymbolMapState,
    useStockConfigState,
    useStockFeedState,
} from 'hooks/useStockFeedState';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Overlay } from 'react-native-elements';
import MultiSelect from 'react-native-multiple-select';
import { useDispatch } from 'react-redux';

interface StocksPickerProps {}

const StocksPicker = (props: StocksPickerProps) => {
    const dispatch = useDispatch();

    // Called 'once' on init
    useEffect(() => {
        dispatch(getAllStockTickerSymbols());
    }, [dispatch]);

    const { data } = useStockFeedState();
    const { configLabels } = useStockConfigState();
    const { symbolCodes } = useAllStockSymbolsState();
    const { configBySymbolMap } = useConfigBySymbolMapState(symbolCodes);

    const defaultConfigLabels = ['open', 'week52High', 'week52Low'];
    const [settingsVisible, setSettingsVisible] = useState(false);
    const [listIsOpen, setListIsOpen] = useState(false);
    const [selectedSymbol, setSelectedSymbol] = useState('');
    const [companyTickerSymbols] = React.useState([...symbolCodes]);

    const toggleSettings = (symbol?: string) => {
        if (symbol) {
            setSelectedSymbol(symbol);
        }
        setSettingsVisible(!settingsVisible);
    };

    const resetDefaultSymbolLabels = (symbol?: string) => {
        if (symbol) {
            dispatch(
                updateSelectedMetrics({
                    selectedMetricsBySymbol: {
                        ...configBySymbolMap,
                        [selectedSymbol]: [...defaultConfigLabels],
                    },
                }),
            );
        }
    };

    const setSelectedSymbolConfig = (config: string[]) => {
        if (selectedSymbol) {
            dispatch(
                updateSelectedMetrics({
                    selectedMetricsBySymbol: { ...configBySymbolMap, [selectedSymbol]: config },
                }),
            );
        }
    };

    return (
        <View style={styles.viewContainer}>
            <Overlay
                isVisible={true}
                fullScreen={true}
                style={[styles.overlayContainer]}
                onBackdropPress={toggleSettings}>
                <View style={[styles.selectContainer]}>
                    <MultiSelect
                        fontFamily="roboto"
                        items={companyTickerSymbols}
                        displayKey="symbol"
                        uniqueKey="symbol"
                        hideSubmitButton={true}
                        hideDropdown={true}
                        hideTags={false}
                        onSelectedItemsChange={(config) => setSelectedSymbolConfig(config)}
                        onToggleList={() => setListIsOpen(!listIsOpen)}
                        styleListContainer={[styles.selectList]}
                        // selectedItems={configBySymbolMap[selectedSymbol]}
                        selectText="Symbols"
                        fontSize={16}
                        searchInputPlaceholderText="Search Ticker Symbols..."
                        onChangeInput={(text) => console.log(text)}
                        altFontFamily="ProximaNova-Light"
                        tagRemoveIconColor="#FFFFFF"
                        tagBorderColor="#FFFFFF"
                        tagTextColor="#FFFFFF"
                        selectedItemTextColor="#CCC"
                        selectedItemIconColor="#CCC"
                        styleMainWrapper={styles.listWrapper}
                        itemTextColor="#000"
                        searchInputStyle={{ color: '#CCC' }}
                        submitButtonColor="#CCC"
                        submitButtonText="Submit"
                    />
                </View>
            </Overlay>
        </View>
    );
};

export default StocksPicker;

const styles = StyleSheet.create({
    gridView: {
        marginTop: 10,
        flex: 1,
    },
    buttonContainer: {
        alignSelf: 'center',
        paddingLeft: 20,
        flex: 0.2,
        height: 4,
        backgroundColor: 'grey',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonContainerMinimized: {
        paddingTop: 40,
        alignSelf: 'center',
        paddingLeft: 20,
        flex: 0.1,
        backgroundColor: 'grey',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    viewContainer: {
        backgroundColor: 'white',
    },
    listWrapper: {
        backgroundColor: 'grey',
    },
    selectContainer: {
        flex: 7,
        backgroundColor: 'grey',
    },
    selectDismiss: {
        flex: 1,
        backgroundColor: 'grey',
    },
    space: {
        width: 20,
        height: 20,
    },
    selectList: {
        height: 600,
    },
    listContainer: {
        backgroundColor: ES_GREEN,
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
    },
    submitButtonColor: {
        alignSelf: 'center',
        backgroundColor: ES_BLUE,
    },
    cancelButtonColor: {
        alignSelf: 'center',
        backgroundColor: ES_PINK,
        paddingLeft: 15,
    },
});
