import humps from 'humps';
import { updateSession, logout } from 'actions/userActions';

const ACCESS_TOKEN = 'access-token';
const UID = 'uid';
const CLIENT = 'client';

const UNAUTHORIZED = 401;

export default (store, client) => {
  client.interceptors.request.use(config => {
    const { info } = store.getState().session;
    const { data, headers } = config;
    if (info) {
      const { token, client, uid } = info;
      config.headers = {
        ...headers,
        [ACCESS_TOKEN]: token,
        client,
        uid,
      };
    }
    config.data = humps.decamelizeKeys(data);
    return config;
  });

  client.interceptors.response.use(
    async response => {
      const { headers, data } = response;
      const token = headers[ACCESS_TOKEN];
      if (token) {
        const session = {
          token,
          uid: headers[UID],
          client: headers[CLIENT],
        };
        store.dispatch(updateSession(session));
      }
      response.data = humps.camelizeKeys(data);
      return response;
    },
    error => {
      if (error.response && error.response.status === UNAUTHORIZED) {
        store.dispatch(logout());
      }

      return Promise.reject(error);
    },
  );
};
