import { useSelector } from 'react-redux';
import { SymbolCodes, MetricLabels, SymbolTickerCodes } from 'reducers/stocksFeedReducer';
import { RootState } from '../reducers';

export const defaultConfigLabels = ['companyName', 'open', 'week52High', 'week52Low'];

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
 

export const useConfigBySymbolMapState = () =>
    useSelector((state: RootState) => ({
        selectedConfigBySymbolMap: (state as any).stockFeed.selectedMetricsBySymbol as MetricLabels,
    }));

export const useDefaultConfigBySymbolMapState = () =>
    useSelector((state: RootState) => ({
        defaultConfigBySymbolMap: assignDefaultConfigLabels(
           ((state as any).stockFeed.symbolCodes.map((code: { symbol: string }) => code?.symbol)),
        )   
    }));

export default { useStockFeedState, useStockConfigState, useStockSymbolsState };


/**
 * Assigns default labels to a given stock symbol if not set
 * @param newSymbols 
 * @param existingSymbols 
 * @returns 
 */
export const assignDefaultConfigLabels = (newSymbols: string[], existingSymbols?: MetricLabels | undefined) => {
    const existingSymbolIds = existingSymbols ? Object.keys(existingSymbols) : [];
    // Remove existing symbol codes from the default label assignment, as 
    // we don't want to overwrite exisiting selected metrics per symbol
    if (existingSymbolIds?.length > 0) {
        newSymbols = newSymbols?.filter((item) => !existingSymbolIds?.includes(item));
    }
    let defaultConfigBySymbol = newSymbols?.map((symbolCode) => ({
        stockKey: symbolCode,
        labelValues: [...defaultConfigLabels],
    }));
    const defaultStockConfigLabels = defaultConfigBySymbol?.reduce(
        (config: any, item: { stockKey: any; labelValues: any }) =>
            Object.assign(config, { [item.stockKey]: item.labelValues }),
        {},
    );
    return defaultStockConfigLabels;
};
