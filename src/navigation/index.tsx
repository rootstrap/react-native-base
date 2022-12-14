import React, { useEffect } from 'react';
import RNBootSplash from 'react-native-bootsplash';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthStack from 'navigation/stacks/auth';
import MainStack from 'navigation/stacks/main';

import { GlobalStore } from 'storage/stores';

const AppStack = createNativeStackNavigator();

const NavigationStack: React.FunctionComponent = () => {
  const [user] = GlobalStore.user.useValueListener();

  useEffect(() => {
    setTimeout(() => RNBootSplash.hide({ fade: true }), 3000);
  }, []);

  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {!user ? (
        <AppStack.Screen name={'Auth'} component={AuthStack} />
      ) : (
        <AppStack.Screen name={'Main'} component={MainStack} />
      )}
    </AppStack.Navigator>
  );
};

export default NavigationStack;
