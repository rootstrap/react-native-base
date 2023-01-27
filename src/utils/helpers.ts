import queryString from 'query-string';
import { SymbolCodes } from 'reducers/stocksFeedReducer';

export const applyQueryParams = (url: any, params: { [key: string]: any }) => {
    const queryParams = queryString.stringify(params);
    return `${url}?${queryParams}`;
};

/**
 * CSV's array of string and appends to given key param in URL
 * @param url
 * @param values
 * @param key
 * @returns
 */
export const applyArrayQueryParam = (url: any, values: string[], key: string) => {
    const paramValues = values.map((value) => value.toLocaleLowerCase()).toString();
    console.log(`paramValues: ${paramValues}`);
    return `${url}?${key}=${paramValues}`;
};

export const isString = (value: any) => {
  return Object.prototype.toString.call(value) === '[object String]';
}

export const assignEmptyIfNotString = (value: any) => {
    return Object.prototype.toString.call(value) === '[object String]' ? value : "";
};

export const removeDuplicateSymbols = (combinedSymbolsList: SymbolCodes[]) => {
    return combinedSymbolsList?.filter(
        (val, index, symbolList) =>
            symbolList?.findIndex(
                (val2) => val2?.symbol?.toUpperCase() === val?.symbol?.toUpperCase(),
            ) === index,
    );
};

export const getRandomColor = (): string => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};