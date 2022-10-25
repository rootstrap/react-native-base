import { createReducer } from '@rootstrap/redux-tools';
import {
    getStocksFeedSuccess,
    getAllStocksFeedSuccess,
    getStocksConfigSuccess,
    getStocksSymbolsSuccess,
    updateSelectedMetrics,
    updateSelectedSymbols,
    getAllStockTickerSymbolsSuccess,
} from '../actions/stocksFeedActions';
import update from 'immutability-helper';
import { assignDefaultConfigLabels } from 'hooks/useStockFeedState';
import { getRandomColor } from 'utils/helpers';

const initialState = {
    data: [],
    config: [],
    symbolCodes: [],
    selectedMetricsBySymbol: undefined,
    selectedSymbols: [],
    selectedSymbolNames: [],
};

interface FeedItem {
    id: string;
    metrics: { [key: string]: string };
}

interface ConfigLabel {
    id: string;
    name: string;
}
interface StocksFeed {
    data: FeedItem[];
    config: ConfigLabel[];
    symbolCodes: SymbolCodes[];
    symbolCodesAll: SymbolTickerCodes[];
    selectedMetricsBySymbol?: MetricLabels;
    selectedSymbols?: SymbolCodes[];
    selectedSymbolNames?: String[]
}

export interface MetricLabels {
    stockKey: string;
    labelValues: string[];
}

interface ConfigLabel {
    id: string;
    name: string;
}

export interface SymbolCodes {
    code?: string;
    symbol: string;
    color: string;
}

export interface SymbolTickerCodes {
    symbol: string;
    name: string;
    isEnabled?: boolean;
}

const handleGetStocksFeedSuccess = (
    state: StocksFeed,
    data: { payload: { [key: string]: string } },
) => {
    const latestSymbolData = { id: data.payload?.symbol, metrics: data.payload };
    const updatedSymbol: string = data?.payload?.symbol;

    const foundIndex = state.data?.findIndex((item) => item.id === updatedSymbol);

    // Push or replace data for symbol ID
    if (foundIndex > -1) {
        state.data = update(state.data, { [foundIndex]: { $set: latestSymbolData } });
    } else {
        state.data = update(state.data, { $push: [latestSymbolData] });
    }
};

const handleGetAllStocksFeed = (state: StocksFeed, data: { payload: any[] }) => {
    // todo: merge items by ID key, preferring new data pushed to store over existing
    state.data = [...mapBatchQuoteDataToFeedItems(data.payload), ...state.data];
};

const handleGetStocksConfigSuccess = (state: StocksFeed, data: { payload: ConfigLabel[] }) => {
    state.config = [...mapConfigToSymbolItems(data?.payload)];
};

const handleGetStocksSymbolsSuccess = (state: StocksFeed, data: { payload: SymbolCodes[] }) => {
    state.symbolCodes = [...data?.payload];
};

const handleUpdateSelectedMetrics = (
    state: StocksFeed,
    data: { payload: { selectedMetricsBySymbol: { stockKey: string; labelValues: string[] } } },
) => {
    state.selectedMetricsBySymbol = { ...data?.payload?.selectedMetricsBySymbol };
};

const handleUpdateSelectedSymbols = (
    state: StocksFeed,
    data: { payload: { selectedSymbols: string[] } },
) => {
    state.selectedSymbols = [...mapRandomColorCodesToItems(data?.payload?.selectedSymbols) || []];
    state.selectedSymbolNames = [...data?.payload?.selectedSymbols] || [];
    state.selectedMetricsBySymbol = {
        ...state.selectedMetricsBySymbol,
        ...assignDefaultConfigLabels(data?.payload?.selectedSymbols, state.selectedMetricsBySymbol),
    };
};

const handleGetAllStockTickerSymbolsSuccess = (
    state: StocksFeed,
    data: { payload: SymbolTickerCodes[] },
) => {
    state.symbolCodesAll = [...data?.payload];
};

export default createReducer(initialState, {
    [getStocksFeedSuccess]: handleGetStocksFeedSuccess,
    [getAllStocksFeedSuccess]: handleGetAllStocksFeed,
    [getStocksConfigSuccess]: handleGetStocksConfigSuccess,
    [getStocksSymbolsSuccess]: handleGetStocksSymbolsSuccess,
    [updateSelectedMetrics]: handleUpdateSelectedMetrics,
    [updateSelectedSymbols]: handleUpdateSelectedSymbols,
    [getAllStockTickerSymbolsSuccess]: handleGetAllStockTickerSymbolsSuccess,
});

// Model Mappers
const mapRandomColorCodesToItems = (data: string[]): SymbolCodes[] => {
   return data?.map((item) => ({ symbol: item, color: getRandomColor() }) || []);
};

const mapBatchQuoteDataToFeedItems = (data: any[]): FeedItem[] => {
    return Object.keys(data)
        .filter((v) => data[v] != null)
        .map((key) => ({ id: key?.toLocaleUpperCase(), metrics: data[key]?.quote || {} }));
};

const mapConfigToSymbolItems = (data: any[]): ConfigLabel[] => {
    return data
        ? Object.keys(data).map((key, index) => ({
              id: `${index}-${key}`,
              name: key,
          }))
        : [];
};


