import queryString from 'query-string';

export const applyQueryParams = (url: any, params: { [key: string]: any }) => {
    const queryParams = queryString.stringify(params);
    return `${url}?${queryParams}`;
};

/**
 * CSV's array of string and appens to given key param in URL
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
