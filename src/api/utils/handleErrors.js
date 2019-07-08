import { sessionService } from 'redux-react-native-session';
import parseError from './parseError';
import saveSessionHeaders from './saveSessionHeaders';

export default async response => {
  if (!response) {
    throw new Error({ message: 'No response returned from fetch' });
  }

  if (response.ok) {
    await saveSessionHeaders(response.headers);
    return response;
  }

  try {
    await sessionService.loadSession();

    if (response.status === 401) {
      await sessionService.deleteSession();
    }
  } catch (error) {
    console.log(error);
  }

  throw await parseError(response);
};
