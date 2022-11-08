import humps from 'humps';
import storage, { StoreKeys } from 'storage';

import { useSessionFromStorage } from 'hooks/useSessionFromStorage';

import httpClient, { CONTENT_TYPE, MULTIPART_FORM_DATA } from '.';

const ACCESS_TOKEN = 'access-token';

export default () => {
  httpClient.interceptors.request.use(request => {
    const { data, headers } = request;

    const session = useSessionFromStorage();

    if (session) {
      const { token } = session;

      // TODO: attach extra params to request
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

      if (token) {
        // TODO: save extra params to storage
        const session = {
          token,
        };

        storage.setValue(StoreKeys.session, JSON.stringify(session));
      }

      response.data = humps.camelizeKeys(data);
      return response;
    },
    error =>
      // TODO: include additional interceptors here (IE: logout)
      Promise.reject(error),
  );
};
