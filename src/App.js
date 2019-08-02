import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { sessionService } from 'redux-react-native-session';

import AppContainer from './navigators';
import configureStore from './store/configureStore';

const store = configureStore({});

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
