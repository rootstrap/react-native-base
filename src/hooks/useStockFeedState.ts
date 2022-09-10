import { useSelector } from 'react-redux';
import { SymbolCodes, MetricLabels, SymbolTickerCodes } from 'reducers/stocksFeedReducer';
import { RootState } from '../reducers';

const defaultConfigLabels = ['open', 'week52High', 'week52Low'];

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
        symbolCodes: ((state as any).stockFeed.symbolCodes as SymbolCodes[]) || [],
    }));

export const useSelectedStockSymbolState = () =>
    useSelector((state: RootState) => ({
        selectedSymbols: ((state as any).stockFeed.selectedSymbols as SymbolCodes[]) || [],
    }));

export const useAllStockSymbolsState = () =>
    useSelector((state: RootState) => ({
        symbolCodes:
            ((state as any).stockFeed.symbolCodesAll as SymbolTickerCodes[])?.filter(
                (symbol) => symbol.isEnabled,
            ) || [],
    }));

export const useSelectedStockSymbolNamesState = () =>
    useSelector((state: RootState) => ({
        selectedSymbolNames: (state as any).stockFeed.selectedSymbolNames as string[],
    }));
    

export const useConfigBySymbolMapState = (symbols: any[]) =>
    useSelector((state: RootState) => ({
        configBySymbolMap:
            ((state as any).stockFeed.selectedMetricsBySymbol as MetricLabels) ||
            assignDefaultConfigLabels(symbols),
    }));

export default { useStockFeedState, useStockConfigState, useStockSymbolsState };

const assignDefaultConfigLabels = (symbols: string[]) => {
    let defaultConfigBySymbol = (symbols as any).map((item: { symbol: any }) => ({
        stockKey: item.symbol,
        labelValues: [...defaultConfigLabels],
    }));
    const defaultStockConfigLabels = defaultConfigBySymbol.reduce(
        (config: any, item: { stockKey: any; labelValues: any }) =>
            Object.assign(config, { [item.stockKey]: item.labelValues }),
        {},
    );
    return defaultStockConfigLabels;
};
