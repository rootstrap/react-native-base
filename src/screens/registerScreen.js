import React from 'react';
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { string } from 'prop-types';

import withNavigation from 'components/hocs/withNavigation';
import Context from 'screens/screenContext';

const registerScreen = (name, Component, store) => {
  const ConnectedComponent = ({ componentId, ...props }) => {
    const NavigationComponent = withNavigation(Component);
    return (
      <Context.Provider value={componentId}>
        <Provider store={store}>
          <NavigationComponent {...props} />
        </Provider>
      </Context.Provider>
    );
  };

  ConnectedComponent.options = Component.options;

  ConnectedComponent.propTypes = {
    componentId: string
  };

  Navigation.registerComponent(name, () => ConnectedComponent);
};

export default registerScreen;
