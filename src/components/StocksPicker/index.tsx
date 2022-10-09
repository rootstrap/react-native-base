import { getAllStockTickerSymbols, updateSelectedSymbols } from 'actions/stocksFeedActions';
import { ES_BLUE, ES_GREEN, ES_PINK } from 'constants/colors';
import { useAllStockSymbolsState, useSelectedStockSymbolNamesState } from 'hooks/useStockFeedState';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import { useDispatch } from 'react-redux';


interface StocksPickerProps {
}

const StocksPicker = (props: StocksPickerProps) => {
    const dispatch = useDispatch();

    // Called 'once' on init
    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            dispatch(getAllStockTickerSymbols());
        }
        return () => {
            isMounted = false;
        };
    }, [dispatch]);

    const { symbolCodes } = useAllStockSymbolsState();
    const { selectedSymbolNames } = useSelectedStockSymbolNamesState();

    const [listIsOpen, setListIsOpen] = useState(false);
    const [companyTickerSymbols] = React.useState([...symbolCodes]);

    const setSelectedSymbols = (selectedSymbols: string[]) => {
        dispatch(
            updateSelectedSymbols({
                selectedSymbols,
            }),
        );
    };


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
                    selectedItems={selectedSymbolNames}
                    selectedItemTextColor={ES_GREEN}
                    selectedItemIconColor={ES_GREEN}
                    selectText="Symbols"
                    fontSize={16}
                    searchInputPlaceholderText="Search Labels..."
                    altFontFamily="ProximaNova-Light"
                    tagRemoveIconColor="#FFFFFF"
                    tagBorderColor="#FFFFFF"
                    tagTextColor="#FFFFFF"
                    styleMainWrapper={styles.listWrapper}
                    itemTextColor="#000"
                    searchInputStyle={{ color: ES_GREEN }}
                />
            </View>
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
