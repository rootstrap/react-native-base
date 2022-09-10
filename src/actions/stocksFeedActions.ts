import { createThunk, createAction } from '@rootstrap/redux-tools';
import { assignEmptyIfNotString } from 'utils/helpers';
import stocksService from '../services/stocksService';
import parseError from '../utils/parseError';

export const symbolsCodeMap = [
    { symbol: 'fb', color: '#1abc9c' },
    { symbol: 'aapl', color: '#2ecc71' },
    { symbol: 'amc', color: '#3498db' },
    { symbol: 'gme', color: '#9b59b6' },
    { symbol: 'tsla', color: '#34495e' },
    { symbol: 'amzn', color: '#16a085' },
    { symbol: 'nvda', color: '#27ae60' },
    { symbol: 'msft', color: '#2980b9' },
    { symbol: 'tsm', color: '#16a085' },
    { symbol: 'nio', color: '#16a085' },
];

export const getAllStockTickerSymbols = createThunk('GET_ALL_STOCK_TICKER_SYMBOLS', async () => {
    try {
        const { data } = await stocksService.getAllStockTickerSymbols();
        return data;
    } catch ({ response }) {
        console.log(JSON.stringify(response));
        throw parseError(response as any);
    }
});

export const getStockFeed = createThunk('GET_STOCKS_FEED', async (symbol: string = "") => {
    try {
        const { data } = await stocksService.getStockSymbolData(assignEmptyIfNotString(symbol));
        return data;
    } catch ({ response }) {
        console.log(JSON.stringify(response));
        throw parseError(response as any);
    }
});

export const getAllStocksFeed = createThunk('GET_ALL_STOCKS_FEED', async (symbols: string[]) => {
    try {
        if (symbols?.length > 0) {
            const { data } = await stocksService.getAllStocksSymbolData(symbols);
            return data;
        }
        return [];
    } catch ({ response }) {
        console.log(JSON.stringify(response));
        throw parseError(response as any);
    }
});

export const getDefaultStockSymbols = createThunk('GET_STOCKS_SYMBOLS', async (count?: number) => {
    try {
        // todo: map selectedSymbols state to symbolscolorMap array, decorate symbols with random color color
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
        return data;
    } catch ({ response }) {
        console.log(JSON.stringify(response));
        throw parseError(response as any);
    }
});

// Non Async actions:
export const updateSelectedMetrics = createAction('UPDATE_SELECTED_METRICS');
export const updateSelectedSymbols = createAction('UPDATE_SELECTED_SYMBOLS');

// Async actions
export const { success: getAllStocksFeedSuccess } = getAllStocksFeed;
export const { success: getStocksFeedSuccess } = getStockFeed;
export const { success: getStocksConfigSuccess } = getStockConfig;
export const { success: getStocksSymbolsSuccess } = getDefaultStockSymbols;
export const { success: getAllStockTickerSymbolsSuccess } = getAllStockTickerSymbols;
