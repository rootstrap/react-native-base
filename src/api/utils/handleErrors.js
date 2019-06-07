import { sessionService } from 'redux-react-native-session';
import saveSessionHeaders from './saveSessionHeaders';

export default async (response) => {
  if (!response) {
    throw new Error({ message: 'No response returned from fetch' });
  }

  if (response.ok) {
    await saveSessionHeaders(response.headers);
    return response;
  }

  try {
    await sessionService.loadSession()
      .then(() => {
        if (response.status === 401) {
          sessionService.deleteSession();
        }
      });
  } catch (e) {} // eslint-disable-line

  throw await response.json()
    .then(json => json || { message: response.statusText })
    .catch(() => ({ message: 'Response not JSON' }));
};
