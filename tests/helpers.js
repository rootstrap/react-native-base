import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { thunkMiddleware } from '@rootstrap/redux-tools';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react-native';
import { createStore, applyMiddleware } from 'redux';
import MockAdapter from 'axios-mock-adapter';

import reducer from 'reducers';
import httpClient from 'httpClient';
import applyDefaultInterceptors from 'httpClient/applyDefaultInterceptors';

const TEST_NAVIGATOR = 'TestNavigator';

export const BUTTON_DISABLED_EXCEPTION = 'No handler function found for event: "press"';

export const AUTHENTICATED_RESPONSE_HEADERS = {
  'access-token': 'token',
  uid: 'example@rootstrap.com',
  client: 'client',
};

const Stack = createStackNavigator();

export const configureStore = (initialState = {}) => {
  const middlewares = [thunkMiddleware];

  const store = createStore(reducer, initialState, applyMiddleware(...middlewares));

  return store;
};

export const configureAuthenticatedStore = (initialState = {}) =>
  configureStore({
    session: {
      user: {
        email: 'example@rootstrap.com',
      },
      info: {
        token: 'token',
        uid: 'example@rootstrap.com',
        client: 'client',
      },
    },
    ...initialState,
  });

export const renderWithRedux = (component, store) => ({
  ...render(<Provider store={store}>{component}</Provider>),
  store,
});

export const renderWithNavigation = (component, store, { navigatorConfig = {} } = {}) => {
  const App = () => (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator {...navigatorConfig}>
          <Stack.Screen name={TEST_NAVIGATOR} component={component} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );

  return { ...render(<App />) };
};

export const mockedHttpClient = (store, options = {}) => {
  applyDefaultInterceptors(store, httpClient);

  return new MockAdapter(httpClient, options);
};
