import React, { useCallback, useEffect, useState } from 'react';
import { FlatGrid } from 'react-native-super-grid';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    RefreshControl,
    ScrollView,
    Animated,
    Easing,
} from 'react-native';
import memoize from 'fast-memoize';
import MultiSelect from 'react-native-multiple-select';
import { Button, Icon, Overlay } from 'react-native-elements';
import {
    getStockFeed,
    getStockConfig,
    getDefaultStockSymbols,
    getAllStocksFeed,
    updateSelectedMetrics,
} from 'actions/stocksFeedActions';
import {
    useStockFeedState,
    useStockConfigState,
    useStockSymbolsState,
    useConfigBySymbolMapState,
    useSelectedStockSymbolState,
    defaultConfigLabels,
} from 'hooks/useStockFeedState';
import strings from '../../locale';
import { startCase } from 'lodash';
import useHideWhenKeyboardOpen from 'hooks/useHideWhenKeyboardOpen';
import useStockFormatUtils from 'hooks/useStockFormatUtils';
import { ES_BLUE, ES_GREEN, ES_PINK } from '../../config/colors';
import { isString, removeDuplicateSymbols } from 'utils/helpers';
import { useDispatch } from 'react-redux';
import { SUCCESS, ERROR, useStatus } from '@rootstrap/redux-tools';
import { FadeInView } from 'components/AnimatedViews';
import { IS_INDIVIDUAL_STOCK_REFRESH_ENABLED } from '../../config/features';

interface StocksFeedProps {}

const StocksFeed = (props: StocksFeedProps) => {
    const dispatch = useDispatch();
    const stocksFeedRequest = useCallback(
        memoize((symbol) => () => dispatch(getStockFeed(symbol))),
        [],
    );

    // Called 'once' on init
    useEffect(() => {
        let isCancelled = false;
        if (!isCancelled) {
            dispatch(getStockConfig());
        }
        return () => {
            isCancelled = true;
        };
    }, [dispatch]);

    useEffect(() => {
        dispatch(getDefaultStockSymbols());
    }, [dispatch]);

    const { data } = useStockFeedState();
    const { configLabels } = useStockConfigState();
    const { symbolCodes } = useStockSymbolsState();

    const canRefreshTile = IS_INDIVIDUAL_STOCK_REFRESH_ENABLED;

    const [settingsVisible, setSettingsVisible] = useState(false);
    const [listIsClosed, setListIsClosed] = useState(false);
    const [selectedSymbol, setSelectedSymbol] = useState('');
    const { selectedConfigBySymbolMap } = useConfigBySymbolMapState();
    const configBySymbolMap = { ...selectedConfigBySymbolMap };

    const { selectedSymbols } = useSelectedStockSymbolState();
    const [defaultTickerSymbols] = React.useState([...symbolCodes]);
    let combinedSymbolsList = [...selectedSymbols, ...defaultTickerSymbols];
    combinedSymbolsList = removeDuplicateSymbols(combinedSymbolsList);

    const { status: getAllStocksStatus } = useStatus(getAllStocksFeed);
    const [refreshing, setRefreshing] = React.useState(false);

    let opacity = new Animated.Value(1);
    const size = opacity.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 22],
    });

    const animatedStyles = [
        styles.header,
        {
            opacity,
            width: size,
            height: size,
        },
    ];


    useEffect(() => {
        if (getAllStocksStatus === SUCCESS || getAllStocksStatus === ERROR) {
            setRefreshing(false);
        }
    }, [getAllStocksStatus]);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        startAnimation();
    }, []);

    useEffect(() => {
        dispatch(getAllStocksFeed(combinedSymbolsList?.map((item) => item?.symbol) || undefined));
    }, [dispatch, selectedSymbols, refreshing]);

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

    // Uses RN Animation Easing to animate icon bounce effect
    // TODO: move to an Animations export and debug animation code..
    const startAnimation = () => {
        opacity.setValue(1);
        Animated.timing(opacity, {
            toValue: 0,
            duration: 1200,
            easing: Easing.in(Easing.bounce),
            useNativeDriver: true
        }).start();
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

    function TileRefreshControl(props: { isEnabled: any; item: { symbol: any } }) {
        const isEnabled = props.isEnabled;
        if (isEnabled) {
            return (
                <Button
                    icon={{
                        name: 'refresh',
                        size: 20,
                        color: 'white',
                    }}
                    disabled={IS_INDIVIDUAL_STOCK_REFRESH_ENABLED}
                    onPress={stocksFeedRequest(props.item?.symbol)}
                    raised={true}
                    type="clear"></Button>
            );
        }
        return null;
    }

    const isKeyboardShown = useHideWhenKeyboardOpen();

    return (
        <SafeAreaView style={styles.viewContainer}>
            {/* <Text>{JSON.stringify(combinedSymbolsList)}</Text> */}
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                {/* <Text>{`Action Status = ${getAllStocksStatus}`}</Text> */}
                <FlatGrid
                    itemDimension={130}
                    data={combinedSymbolsList}
                    style={styles.gridView}
                    spacing={10}
                    testID="tile-grid"
                    renderItem={({ item }) => {
                        return (
                            <View
                                style={[
                                    styles.itemContainer,
                                    { backgroundColor: item?.color || item?.code },
                                ]}>
                                <View
                                    style={[
                                        styles.itemContent,
                                        { backgroundColor: item?.color || item?.code },
                                    ]}>
                                    <View style={styles.header}>
                                        <Animated.View style={animatedStyles}>
                                            <Icon
                                                name="briefcase"
                                                type="font-awesome"
                                                color="white"
                                                size={22}
                                            />
                                        </Animated.View>
                                        <Text style={styles.itemName}>{`${
                                            isString(item?.symbol)
                                                ? item?.symbol?.toUpperCase()
                                                : 'n-f'
                                        }`}</Text>
                                        <TileRefreshControl
                                            isEnabled={canRefreshTile}
                                            item={item}></TileRefreshControl>
                                    </View>
                                    {configBySymbolMap[item.symbol]?.length
                                        ? configBySymbolMap[item.symbol]?.map(
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
                                        : defaultConfigLabels?.map(
                                              (configLabel: string, index: number) => (
                                                  <Metric
                                                      styles={styles}
                                                      key={index}
                                                      data={data}
                                                      configLabel={configLabel}
                                                      item={item}
                                                  />
                                              ),
                                          )}
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
            </ScrollView>
            {/* stock metrics list */}
            <Overlay
                isVisible={settingsVisible}
                fullScreen={true}
                style={[styles.overlayContainer]}
                onBackdropPress={toggleSettings}>
                <FadeInView style={[styles.selectContainer]}>
                    <MultiSelect
                        fontFamily="roboto"
                        items={configLabels}
                        uniqueKey="name"
                        hideSubmitButton={true}
                        hideDropdown={true}
                        hideTags={false}
                        onSelectedItemsChange={(config) => setSelectedSymbolConfig(config)}
                        onToggleList={() => setListIsClosed(!listIsClosed)}
                        styleListContainer={[styles.selectList]}
                        selectedItems={configBySymbolMap[selectedSymbol]}
                        selectText="Select Stock Metrics.."
                        fontSize={16}
                        searchInputPlaceholderText="Search Stock KPI's..."
                        onChangeInput={(text) => console.log(text)}
                        altFontFamily="ProximaNova-Light"
                        tagRemoveIconColor="#FFFFFF"
                        tagBorderColor="#FFFFFF"
                        tagTextColor="#FFFFFF"
                        selectedItemTextColor={ES_GREEN}
                        selectedItemIconColor={ES_GREEN}
                        styleMainWrapper={styles.listWrapper}
                        itemTextColor="#000"
                        displayKey="name"
                        searchInputStyle={{ color: '#CCC' }}
                        submitButtonColor="#CCC"
                        submitButtonText="Submit"
                    />
                </FadeInView>
                <View style={styles.listFooterContainer}>
                    <View
                        style={[
                            listIsClosed ? styles.buttonContainer : styles.buttonContainerMinimized,
                        ]}>
                        {!isKeyboardShown && (
                            <>
                                <Button
                                    icon={<Icon name="archive" size={20} color="white" />}
                                    title={strings.STOCKS_FEED.reset}
                                    iconPosition="top"
                                    onPress={() => {
                                        resetDefaultSymbolLabels(selectedSymbol);
                                    }}
                                    type="solid"
                                    style={styles.submitButton}
                                    buttonStyle={styles.cancelButtonColor}
                                    containerStyle={styles.cancelButtonColor}
                                />
                            </>
                        )}
                    </View>
                </View>
            </Overlay>
        </SafeAreaView>
    );
};

export default StocksFeed;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gridView: {
        marginTop: 10,
        flex: 1,
    },
    buttonContainerMinimized: {
        width: 0,
        height: 0,
    },
    buttonContainer: {
        alignSelf: 'center',
        paddingLeft: 20,
        backgroundColor: ES_GREEN,
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 1,
    },
    viewContainer: {
        backgroundColor: 'white',
    },
    commonSettingArea: {
        backgroundColor: ES_GREEN,
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: 40,
        paddingTop: 5,
        alignItems: 'center',
    },
    commonSettingsButton: {},
    listWrapper: {
        backgroundColor: ES_GREEN,
    },
    selectContainer: {
        flex: 7,
        backgroundColor: ES_GREEN,
    },
    listFooterContainer: {
        flex: 1,
        backgroundColor: ES_GREEN,
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
        justifyContent: 'center',
        alignItems: 'baseline',
        paddingBottom: 4,
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
        paddingLeft: 6,
        color: '#fff',
        fontWeight: '600',
    },
    settingButtonDivider: {
        width: 15,
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
        flex: 1,
    },
    submitButtonColor: {
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: ES_BLUE,
    },
    cancelButtonColor: {
        alignSelf: 'center',
        backgroundColor: ES_PINK,
    },
});
