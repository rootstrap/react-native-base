import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import useSession from 'hooks/useSession';

import AppStack from './AppStack';
import AuthStack from './AuthStack';

const Stack = createStackNavigator();

const Navigation = () => {
  const { user, info } = useSession();

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {user && info ? (
          <Stack.Screen name="AppStack" component={AppStack} />
        ) : (
          <Stack.Screen name="AuthStack" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
