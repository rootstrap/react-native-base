import { createReducer } from '@rootstrap/redux-tools';
import { getStocksFeedSuccess } from '../actions/stocksFeedActions';
import update from 'immutability-helper';


const initialState = {
  data: [],
};

interface FeedItem { 
  id: string, metrics: { [key: string] : string} 
}
interface StocksFeed {
  data: FeedItem[];
}

// *Success type actions handle updating state from request payload
const handleGetStocksFeedSuccess = (state: StocksFeed, data: { payload: { [key: string] : string} }) => {

  const latestSymbolData = { id: data.payload?.symbol, metrics: data.payload }
  const updatedSymbol: string = data?.payload?.symbol;

  const foundIndex = state.data?.findIndex(item => item.id === updatedSymbol);

  // Push or replace data for given symbol id
  if (foundIndex > -1) {
    state.data = update(state.data, { [foundIndex]: {$set: latestSymbolData} });
  } else {
    state.data = update(state.data, {$push: [latestSymbolData]});
  }

};

export default createReducer(initialState, {
  [getStocksFeedSuccess]: handleGetStocksFeedSuccess,
});
