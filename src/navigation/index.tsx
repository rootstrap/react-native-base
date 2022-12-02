import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthStack from 'navigation/stacks/auth';
import MainStack from 'navigation/stacks/main';

const user = false; // TODO: Only an example, here we can do some session check ;)

const AppStack = createNativeStackNavigator();
const NavigationStack: React.FunctionComponent = () => (
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

export default NavigationStack;
