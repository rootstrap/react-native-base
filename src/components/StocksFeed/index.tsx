import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FlatGrid } from 'react-native-super-grid';
import { View, Text, Button, StyleSheet } from 'react-native';
import strings from 'locale';
import memoize from "fast-memoize";


import { getStockFeed } from 'actions/stocksFeedActions';

import useStockFeedState from 'hooks/useStockFeedState';

interface StocksFeedProps {}

const StocksFeed = (props: StocksFeedProps) => {
  const dispatch = useDispatch();
  const stocksFeedRequest = React.useCallback(
    memoize((symbol) => () => dispatch(getStockFeed(symbol))),
    []
  );

  const { stockData } = useStockFeedState();

  // todo: provide symbol list or provide defaul view
  // todo: of popular blue chip stocks
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

  return (
    <View>
      <FlatGrid
        itemDimension={130}
        data={items}
        style={styles.gridView}
        spacing={10}
        renderItem={({ item }) => (
          <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
            <Text style={styles.itemName}>{`Symbol: ${item.symbol?.toUpperCase()}`}</Text>
            <Button onPress={stocksFeedRequest(item.symbol)} title={strings.STOCKS_FEED.fetchStocks}></Button>
            <Text>{`52 Week high: ${stockData?.payload?.week52High}`}</Text>
            <Text>{`52 Week low: ${stockData?.payload?.week52Low}`}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default StocksFeed;

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1,
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
