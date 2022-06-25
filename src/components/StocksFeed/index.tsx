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
    updateSelectedMetrics,
} from 'actions/stocksFeedActions';
import {
    useStockFeedState,
    useStockConfigState,
    useStockSymbolsState,
    useConfigBySymbolMapState,
} from 'hooks/useStockFeedState';
import strings from '../../locale';
import { startCase } from 'lodash';
import useHideWhenKeyboardOpen from 'hooks/useHideWhenKeyboardOpen';
import useStockFormatUtils from 'hooks/useStockFormatUtils';
import { ES_BLUE, ES_GREEN, ES_PINK } from 'constants/colors';
import StocksPicker from 'components/StocksPicker';

interface StocksFeedProps {}

const StocksFeed = (props: StocksFeedProps) => {
    const dispatch = useDispatch();
    const stocksFeedRequest = useCallback(
        memoize((symbol) => () => dispatch(getStockFeed(symbol))),
        [],
    );

    // Called 'once' on init
    useEffect(() => {
        dispatch(getStockConfig());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getStockSymbols());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAllStocksFeed(symbolCodes.map((item) => item.symbol)));
    }, [dispatch]);

    const { data } = useStockFeedState();
    const { configLabels } = useStockConfigState();
    const { symbolCodes } = useStockSymbolsState();
    const { configBySymbolMap } = useConfigBySymbolMapState(symbolCodes);

    const defaultConfigLabels = ['open', 'week52High', 'week52Low'];
    const [settingsVisible, setSettingsVisible] = useState(false);
    const [stockPickerVisible, setStockPickerVisible] = useState(false);
    const [listIsOpen, setListIsOpen] = useState(false);
    const [selectedSymbol, setSelectedSymbol] = useState('');
    const [companyTickerSymbols] = React.useState([...symbolCodes]);

    const toggleSettings = (symbol?: string) => {
        if (symbol) {
            setSelectedSymbol(symbol);
        }
        setSettingsVisible(!settingsVisible);
    };

    const toggleStockPicker = () => {
        setStockPickerVisible(!stockPickerVisible);
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
        <View style={styles.viewContainer}>
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
                                <View style={styles.settingButtonDivider}></View>
                                <Icon
                                    name="star"
                                    type="font-awesome"
                                    color="white"
                                    size={22}
                                    onPress={() => toggleStockPicker()}
                                />
                            </View>
                        </View>
                    );
                }}
            />
            {/* stock metrics list */}
            <Overlay
                isVisible={settingsVisible}
                fullScreen={true}
                style={[styles.overlayContainer]}
                onBackdropPress={toggleSettings}>
                <View style={[styles.selectContainer]}>
                    <MultiSelect
                        fontFamily="roboto"
                        items={configLabels}
                        uniqueKey="name"
                        hideSubmitButton={true}
                        hideDropdown={true}
                        hideTags={false}
                        onSelectedItemsChange={(config) => setSelectedSymbolConfig(config)}
                        onToggleList={() => setListIsOpen(!listIsOpen)}
                        styleListContainer={[styles.selectList]}
                        selectedItems={configBySymbolMap[selectedSymbol]}
                        selectText="Metrics"
                        fontSize={16}
                        searchInputPlaceholderText="Search Items..."
                        onChangeInput={(text) => console.log(text)}
                        altFontFamily="ProximaNova-Light"
                        tagRemoveIconColor="#FFFFFF"
                        tagBorderColor="#FFFFFF"
                        tagTextColor="#FFFFFF"
                        selectedItemTextColor="#CCC"
                        selectedItemIconColor="#CCC"
                        styleMainWrapper={styles.listWrapper}
                        itemTextColor="#000"
                        displayKey="name"
                        searchInputStyle={{ color: '#CCC' }}
                        submitButtonColor="#CCC"
                        submitButtonText="Submit"
                    />
                </View>
                <TouchableOpacity style={[styles.selectDismiss]}>
                    <View
                        style={[
                            listIsOpen ? styles.buttonContainer : styles.buttonContainerMinimized,
                        ]}>
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
            {/* stock picker list */}
            <Overlay
                isVisible={stockPickerVisible}
                fullScreen={true}
                style={[styles.overlayContainer]}
                onBackdropPress={toggleStockPicker}>
                <StocksPicker onHide={() => setStockPickerVisible(false)}></StocksPicker>
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
        flexDirection: 'row',
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
    settingButtonDivider: {
       width: 15
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
