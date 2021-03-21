import React from 'react';
import { Provider } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import httpClient from './httpClient';
import applyDefaultInterceptors from './httpClient/applyDefaultInterceptors';

import Navigation from 'navigators';
import configureStore from 'store/configureStore';

const { store, persistor } = configureStore({});

applyDefaultInterceptors(store, httpClient);

export interface Props {}
export interface State {}

export class App extends React.Component<Props, State> {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
