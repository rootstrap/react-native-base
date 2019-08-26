import { sessionService } from 'redux-react-native-session';
import saveSessionHeaders from './saveSessionHeaders';

const ACCESS_TOKEN = 'access-token';

const UNAUTHORIZED = 401;

const defaultRequestInterceptors = [
  async request => {
    try {
      const { token, client, uid } = await sessionService.loadSession();
      request.headers = {
        ...request.headers,
        [ACCESS_TOKEN]: token,
        client,
        uid,
      };
    } catch (error) {
      console.log('Failed to load session headers', error); // eslint-disable-line
    }
    return request;
  },
];

const defaultResponseInterceptors = [
  async response => {
    if (response.ok) {
      await saveSessionHeaders(response.headers);
    }
    if (response.status === UNAUTHORIZED) {
      await sessionService.deleteSession();
    }
    return response;
  },
];

export default apiService => {
  defaultRequestInterceptors.forEach(interceptor =>
    apiService.requestInterceptors.use(interceptor),
  );

  defaultResponseInterceptors.forEach(interceptor =>
    apiService.responseInterceptors.use(interceptor),
  );
};
