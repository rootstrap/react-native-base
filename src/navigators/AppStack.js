import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { MAIN_SCREEN } from 'constants/screens';

import MainScreen from 'screens/MainScreen';

const Stack = createStackNavigator();

const AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen name={MAIN_SCREEN} component={MainScreen} />
  </Stack.Navigator>
);

export default AppStack;
