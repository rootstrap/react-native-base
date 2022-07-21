import humps from 'humps';

import httpClient, { CONTENT_TYPE, MULTIPART_FORM_DATA } from '.';

const ACCESS_TOKEN = 'access-token';

export default () => {
  httpClient.interceptors.request.use(request => {
    const { data, headers } = request;

    // TODO: get session from storage
    const session = undefined;

    if (session) {
      const { token } = session;

      // TODO: attach session to request
      request.headers = {
        ...headers,
        [ACCESS_TOKEN]: token,
      };
    }

    if (headers && headers[CONTENT_TYPE] !== MULTIPART_FORM_DATA) {
      request.data = humps.decamelizeKeys(data);
    }

    return request;
  });

  httpClient.interceptors.response.use(
    async response => {
      const { data, headers } = response;
      const token = headers[ACCESS_TOKEN];

      // TODO: save session to storage
      if (token) {
      }

      response.data = humps.camelizeKeys(data);
      return response;
    },
    error =>
      // TODO: include additional interceptors here (IE: logout)
      Promise.reject(error),
  );
};
