import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { sessionService } from 'redux-react-native-session';
import api from 'api';
import applyDefaultInterceptors from 'api/utils/applyDefaultInterceptors';

import AppContainer from './navigators';
import configureStore from './store/configureStore';

const store = configureStore({});

applyDefaultInterceptors(api);

export default function App() {
  useEffect(() => {
    const initSession = async () => {
      await sessionService.initSessionService(store);
    };
    initSession();
  }, []);

  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}
