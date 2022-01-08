import { createReducer } from '@rootstrap/redux-tools';
import {
    getStocksFeedSuccess,
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

interface SymbolCodes {
    symbol: string;
    code: string;
}

// *Success type actions handle updating state from request payload
const handleGetStocksFeedSuccess = (
    state: StocksFeed,
    data: { payload: { [key: string]: string } },
) => {
    const latestSymbolData = { id: data.payload?.symbol, metrics: data.payload };
    const updatedSymbol: string = data?.payload?.symbol;

    const foundIndex = state.data?.findIndex((item) => item.id === updatedSymbol);

    // Push or replace data for given symbol id
    if (foundIndex > -1) {
        state.data = update(state.data, { [foundIndex]: { $set: latestSymbolData } });
    } else {
        state.data = update(state.data, { $push: [latestSymbolData] });
    }
};

const handleGetStocksConfigSuccess = (state: StocksFeed, data: { payload: ConfigLabel[] }) => {
    state.config = [...data?.payload];
};

const handleGetStocksSymbolsSuccess = (state: StocksFeed, data: { payload: SymbolCodes[] }) => {
    state.symbolCodes = [...data?.payload];
};

export default createReducer(initialState, {
    [getStocksFeedSuccess]: handleGetStocksFeedSuccess,
    [getStocksConfigSuccess]: handleGetStocksConfigSuccess,
    [getStocksSymbolsSuccess]: handleGetStocksSymbolsSuccess,
});
