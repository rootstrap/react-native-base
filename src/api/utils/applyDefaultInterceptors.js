import { updateSession, logout } from 'actions/userActions';

const ACCESS_TOKEN = 'access-token';
const UID = 'uid';
const CLIENT = 'client';

const UNAUTHORIZED = 401;

const defaultRequestInterceptors = store => [
  async request => {
    try {
      const { info } = store.getState().session;
      if (info) {
        const { token, client, uid } = info;
        request.headers = {
          ...request.headers,
          [ACCESS_TOKEN]: token,
          client,
          uid,
        };
      }
    } catch (error) {
      console.log('Failed to load session headers', error); // eslint-disable-line
    }
    return request;
  },
];

const defaultResponseInterceptors = store => [
  async response => {
    if (response.ok) {
      const { headers } = response;
      const token = headers.get(ACCESS_TOKEN);
      if (token) {
        const session = {
          token,
          uid: headers.get(UID),
          client: headers.get(CLIENT),
        };
        store.dispatch(updateSession(session));
      }
    }

    if (response.status === UNAUTHORIZED) {
      store.dispatch(logout());
    }
    return response;
  },
];

export default (store, apiService) => {
  defaultRequestInterceptors(store).forEach(interceptor =>
    apiService.requestInterceptors.use(interceptor),
  );

  defaultResponseInterceptors(store).forEach(interceptor =>
    apiService.responseInterceptors.use(interceptor),
  );
};
