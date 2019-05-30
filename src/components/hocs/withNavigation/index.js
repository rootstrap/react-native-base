import React from 'react';
import { Navigation } from 'react-native-navigation';

import Context from 'screens/screenContext';

const withNavigation = Component => (props) => {
  const navigation = componentId => ({
    ...Navigation,

    push: (...args) =>
      Navigation.push(componentId, ...args),

    pop: () => Navigation.pop(componentId),

    popToRoot: () => Navigation.popToRoot(componentId),

    dismissModal: () => Navigation.dismissModal(componentId),
  });

  return (
    <Context.Consumer>
      {componentId =>
        <Component
          componentId={componentId}
          navigation={navigation(componentId)}
          {...props}
        />
      }
    </Context.Consumer>
  );
};

export default withNavigation;
