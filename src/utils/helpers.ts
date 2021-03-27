import queryString from 'query-string';

export const applyQueryParams = (url: any, params: { [key: string]: any; }) => {
  const queryParams = queryString.stringify(params);
  return `${url}?${queryParams}`;
};
