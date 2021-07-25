import { createThunk, createAction } from '@rootstrap/redux-tools';
import stocksService from '../services/stocksService';
import parseError from '../utils/parseError';

export const getStockFeed = createThunk('GET_STOCKS_FEED', async (symbol: string) => {
  try {
    const { data } = await stocksService.getStockSymbolData(symbol);
    return data;
  } catch ({ response }) {
    console.log(JSON.stringify(response));
    throw parseError(response);
  }
});

export const { success: getStocksFeedSuccess } = getStockFeed;
