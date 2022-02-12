import { createReducer } from '@rootstrap/redux-tools';
import {
    getStocksFeedSuccess,
    getAllStocksFeedSuccess,
    getStocksConfigSuccess,
    getStocksSymbolsSuccess,
} from '../actions/stocksFeedActions';
import update from 'immutability-helper';

const initialState = {
    data: [],
    config: [],
    symbolCodes: [],
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
}

interface ConfigLabel {
    id: string;
    name: string;
}

export interface SymbolCodes {
    symbol: string;
    code: string;
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
    state.data = [...mapBatchQuoteDataToFeedItems(data.payload)];
};

const handleGetStocksConfigSuccess = (state: StocksFeed, data: { payload: ConfigLabel[] }) => {
    state.config = [...mapConfigToSymbolItems(data?.payload)];
};

const handleGetStocksSymbolsSuccess = (state: StocksFeed, data: { payload: SymbolCodes[] }) => {
    state.symbolCodes = [...data?.payload];
};

export default createReducer(initialState, {
    [getStocksFeedSuccess]: handleGetStocksFeedSuccess,
    [getAllStocksFeedSuccess]: handleGetAllStocksFeed,
    [getStocksConfigSuccess]: handleGetStocksConfigSuccess,
    [getStocksSymbolsSuccess]: handleGetStocksSymbolsSuccess,
});

// Model Mappers
const mapBatchQuoteDataToFeedItems = (data: any[]) => {
    return Object.keys(data)
        .filter((v) => data[v] != null)
        .map((key) => ({ id: key?.toLocaleUpperCase(), metrics: data[key]?.quote || {} }));
};

const mapConfigToSymbolItems = (data: any[]) => {
    return data
        ? Object.keys(data).map((key, index) => ({
              id: `${index}-${key}`,
              name: key,
          }))
        : [];
};
