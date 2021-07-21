import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import httpClient from 'httpClient';
import applyDefaultInterceptors from 'httpClient/applyDefaultInterceptors';

import Navigation from 'navigators';
import configureStore from 'store/configureStore';
import SplashScreen from 'react-native-splash-screen';

const { store, persistor } = configureStore({});

applyDefaultInterceptors(store, httpClient);

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      // Timeout to avoid a white screen after the splash screen is shown
      SplashScreen.hide();
    }, 100);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
