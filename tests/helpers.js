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

const TEST_NAVIGATOR = 'TestNavigator';

const Stack = createStackNavigator();

export const testingStore = (initialState = {}) => {
  const middlewares = [thunkMiddleware];

  const store = createStore(reducer, initialState, applyMiddleware(...middlewares));

  return store;
};

export const renderWithRedux = component => {
  const store = testingStore();

  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

export const renderWithNavigation = (
  component,
  { initialState = {}, navigatorConfig = {} } = {},
) => {
  const store = testingStore(initialState);

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

export const mockedHttpClient = (options = {}) => new MockAdapter(httpClient, options);
