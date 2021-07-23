import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import httpClient from 'httpClient';
import applyDefaultInterceptors from 'httpClient/applyDefaultInterceptors';

import Navigation from 'navigators';
import configureStore from 'store/configureStore';
import RNBootSplash from 'react-native-bootsplash';

const { store, persistor } = configureStore({});

applyDefaultInterceptors(store, httpClient);

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide();
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
