import queryString from 'query-string';

export const applyQueryParams = (url, params) => {
  const queryParams = queryString.stringify(params);
  return `${url}?${queryParams}`;
};
