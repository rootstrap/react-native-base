import { getAllStockTickerSymbols, updateSelectedSymbols } from 'actions/stocksFeedActions';
import { ES_BLUE, ES_GREEN, ES_PINK } from 'constants/colors';
import { useAllStockSymbolsState, useSelectedStockSymbolState } from 'hooks/useStockFeedState';
import strings from 'locale';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import { useDispatch } from 'react-redux';
import { Button, Icon } from 'react-native-elements';
import useHideWhenKeyboardOpen from 'hooks/useHideWhenKeyboardOpen';

interface StocksPickerProps {
    onHide: (isHidden?: boolean) => void;
}

const StocksPicker = (props: StocksPickerProps) => {
    const dispatch = useDispatch();

    // Called 'once' on init
    useEffect(() => {
        dispatch(getAllStockTickerSymbols());
    }, [dispatch]);

    const { selectedSymbols } = useSelectedStockSymbolState();
    const { symbolCodes } = useAllStockSymbolsState();

    const [listIsOpen, setListIsOpen] = useState(false);
    const [companyTickerSymbols] = React.useState([...symbolCodes]);

    const togglePanel = () => {
        props.onHide(true);            
    };

    const setSelectedSymbols = (selectedSymbols: string[]) => {
        console.log('selectedSymbols: ' + selectedSymbols);
        dispatch(
            updateSelectedSymbols({
                selectedSymbols,
            }),
        );
    };

    const resetDefaultSymbols = () => {
        dispatch(
            updateSelectedSymbols({
                selectedSymbol: [],
            }),
        );
    };

    const isKeyboardShown = useHideWhenKeyboardOpen();

    let stocksPicker;
    
    stocksPicker = (
        <View style={styles.viewContainer}>
            <View style={[styles.selectContainer]}>
                <MultiSelect
                    fontFamily="roboto"
                    items={companyTickerSymbols}
                    displayKey="symbol"
                    uniqueKey="symbol"
                    hideSubmitButton={true}
                    hideDropdown={true}
                    hideTags={false}
                    onSelectedItemsChange={(selectedSymbols) => setSelectedSymbols(selectedSymbols)}
                    onToggleList={() => setListIsOpen(!listIsOpen)}
                    styleListContainer={[styles.selectList]}
                    selectedItems={selectedSymbols}
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
                    searchInputStyle={{ color: ES_GREEN }}
                    submitButtonColor="#CCC"
                    submitButtonText="Submit"
                />
            </View>
            <TouchableOpacity style={[styles.selectDismiss]}>
                <View
                    style={[listIsOpen ? styles.buttonContainerMinimized : styles.buttonContainer]}>
                    {!isKeyboardShown && (
                        <>
                            <Button
                                icon={<Icon name="save" size={16} color="white" />}
                                title={strings.STOCKS_FEED.submit}
                                iconRight={true}
                                onPress={() => {
                                    togglePanel();
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
                                    resetDefaultSymbols();
                                }}
                                style={styles.submitButton}
                                buttonStyle={styles.cancelButtonColor}
                                containerStyle={styles.cancelButtonColor}
                            />
                        </>
                    )}
                </View>
            </TouchableOpacity>
        </View>
    );

    return stocksPicker;
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
        flex: 1,
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
