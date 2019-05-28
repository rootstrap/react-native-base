import { sessionService } from 'redux-react-native-session';
import saveSessionHeaders from './saveSessionHeaders';

export default response =>
  new Promise((resolve, reject) => {
    if (!response) {
      reject({ message: 'No response returned from fetch' });
      return;
    }

    if (response.ok) {
      saveSessionHeaders(response.headers);
      resolve(response);
      return;
    }

    sessionService.loadSession()
      .then(() => {
        if (response.status === 401) {
          sessionService.deleteSession();
        }
      });

    response.json()
      .then((json) => {
        const error = json || { message: response.statusText };
        reject(error);
      }).catch(() => reject({ message: 'Response not JSON' }));
  });
