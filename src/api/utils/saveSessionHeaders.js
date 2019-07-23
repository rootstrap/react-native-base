import { sessionService } from 'redux-react-native-session';

const ACCESS_TOKEN = 'access-token';
const UID = 'uid';
const CLIENT = 'client';

export default headers => {
  if (headers.get(ACCESS_TOKEN)) {
    const sessionHeaders = {
      token: headers.get(ACCESS_TOKEN),
      uid: headers.get(UID),
      client: headers.get(CLIENT),
    };

    return sessionService.saveSession(sessionHeaders);
  }
};
