import { createThunk } from '@rootstrap/redux-tools';
import stocksService from '../services/stocksService';
import parseError from '../utils/parseError';

const symbolsCodeMap = [
    { symbol: 'fb', code: '#1abc9c' },
    { symbol: 'aapl', code: '#2ecc71' },
    { symbol: 'amc', code: '#3498db' },
    { symbol: 'gme', code: '#9b59b6' },
    { symbol: 'tsla', code: '#34495e' },
    { symbol: 'amzn', code: '#16a085' },
    { symbol: 'nvda', code: '#27ae60' },
    { symbol: 'msft', code: '#2980b9' },
    { symbol: 'tsm', code: '#16a085' },
    { symbol: 'nio', code: '#16a085' },
];

export const getStockFeed = createThunk('GET_STOCKS_FEED', async (symbol: string) => {
    try {
        const { data } = await stocksService.getStockSymbolData(symbol);
        return data;
    } catch ({ response }) {
        console.log(JSON.stringify(response));
        throw parseError(response as any);
    }
});

export const getStockSymbols = createThunk('GET_STOCKS_SYMBOLS', async (count?: number) => {
    try {
        // todo retrieve from IEX CLOUD
        // example https://cloud.iexapis.com/beta/ref-data/symbols?token=<MY-TOKEN>
        return symbolsCodeMap;
    } catch ({ response }) {
        console.log(JSON.stringify(response));
        throw parseError(response as any);
    }
});

export const getStockConfig = createThunk('GET_STOCKS_CONFIG', async () => {
    try {
        const DEFAULT_SYMBOL = 'fb';
        const { data } = await stocksService.getStockSymbolData(DEFAULT_SYMBOL);
        // Return property names from request payload
        // used in displaying available labels on stock tile
        const config = data
            ? Object.keys(data).map((key, index) => ({
                  id: `${index}-${key}`,
                  name: key,
              }))
            : [];
        return config;
    } catch ({ response }) {
        console.log(JSON.stringify(response));
        throw parseError(response as any);
    }
});

export const { success: getStocksFeedSuccess } = getStockFeed;
export const { success: getStocksConfigSuccess } = getStockConfig;
export const { success: getStocksSymbolsSuccess } = getStockSymbols;
