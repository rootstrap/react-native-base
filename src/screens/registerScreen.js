import React from 'react';
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';

const registerScreen = (
  name,
  Component,
  store,
) => {
  const ConnectedComponent = props =>
    <Provider store={store}>
      <Component
        {...props}
      />
    </Provider>;
  Navigation.registerComponent(name, () => ConnectedComponent);
};

export default registerScreen;
