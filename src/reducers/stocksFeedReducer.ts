import { createReducer } from '@rootstrap/redux-tools';
import { getStocksFeedSuccess } from '../actions/stocksFeedActions';

const initialState = {
  data: null,
};

interface StocksFeed {
  data: object;
}

// *Success type actions handle updating state from request payload
const handleGetStocksFeedSuccess = (state: StocksFeed, payload: object) => {
  state.data = payload;
};

export default createReducer(initialState, {
  [getStocksFeedSuccess]: handleGetStocksFeedSuccess,
});
