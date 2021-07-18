import { createThunk, createAction } from '@rootstrap/redux-tools';
import stocksService from '../services/stocksService';
import parseError from '../utils/parseError';

export const getStockFeed = createThunk('GET_STOCKS_FEED', async (symbol: string = 'fb') => {
  try {
    const { data: stockData } = await stocksService.getStockSymbolData(symbol);
    return stockData;
  } catch ({ response }) {
    console.log(JSON.stringify(response));
    console.log(JSON.stringify(response.params));

    throw parseError(response);
  }
});

export const { success: getStocksFeedSuccess } = getStockFeed;
