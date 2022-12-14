import humps from 'humps';

import { GlobalStore } from 'storage/stores';

import httpClient, { CONTENT_TYPE, MULTIPART_FORM_DATA } from '.';

const ACCESS_TOKEN = 'access-token';

export default () => {
  httpClient.interceptors.request.use(request => {
    const { data, headers } = request;

    const user = GlobalStore.user.useValue();

    if (user) {
      const { token } = user;

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
        const user = {
          token,
        };

        GlobalStore.user.setValue(user);
      }

      response.data = humps.camelizeKeys(data);
      return response;
    },
    error =>
      // TODO: include additional interceptors here (IE: logout)
      Promise.reject(error),
  );
};
