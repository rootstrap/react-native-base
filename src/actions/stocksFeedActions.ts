import { createThunk } from '@rootstrap/redux-tools';
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

export const getStockConfig = createThunk('GET_STOCKS_CONFIG', async () => {
    try {
        const DEFAULT_SYMBOL = 'fb';
        const { data } = await stocksService.getStockSymbolData(DEFAULT_SYMBOL);
        // Return property names from request payload
        // used in displaying available labels on stock tile
        const config = data?.length
            ? Object.keys(data[0]?.metrics).map((key, index) => ({
                  id: `${index}-${key}`,
                  name: key,
              }))
            : [];
        return config;
    } catch ({ response }) {
        console.log(JSON.stringify(response));
        throw parseError(response);
    }
});

export const { success: getStocksFeedSuccess } = getStockFeed;
export const { success: getStocksConfigSuccess } = getStockConfig;
