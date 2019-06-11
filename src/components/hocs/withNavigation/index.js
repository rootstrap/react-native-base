import React, { useContext } from 'react';
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

  const componentId = useContext(Context);

  return (
    <Component
      componentId={componentId}
      navigation={navigation(componentId)}
      {...props}
    />
  );
};

export default withNavigation;
