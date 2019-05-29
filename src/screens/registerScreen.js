import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';

const registerScreen = (
  name,
  Component,
  store,
) => {
  class ConnectedComponent extends PureComponent {
    static options = {
      ...Component.options,
    }

    render() {
      return (
        <Provider store={store}>
          {React.createElement(Component, this.props)}
        </Provider>
      );
    }
  }

  Navigation.registerComponent(name, () => ConnectedComponent);
};

export default registerScreen;
