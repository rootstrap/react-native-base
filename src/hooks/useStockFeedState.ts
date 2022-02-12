import { useSelector } from 'react-redux';
import { SymbolCodes } from 'reducers/stocksFeedReducer';
import { RootState } from '../reducers';

export const useStockFeedState = () =>
    useSelector((state: RootState) => ({
        data: (state as any).stockFeed.data || {},
    }));

export const useStockConfigState = () =>
    useSelector((state: RootState) => ({
        configLabels: (state as any).stockFeed.config || {},
    }));

export const useStockSymbolsState = () =>
    useSelector((state: RootState) => ({
        symbolCodes: ((state as any).stockFeed.symbolCodes as SymbolCodes) || [],
    }));

export default { useStockFeedState, useStockConfigState, useStockSymbolsState };
