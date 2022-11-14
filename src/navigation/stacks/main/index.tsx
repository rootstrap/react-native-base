import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StackParamList } from 'navigation/types';
import { AppScreens } from 'navigation/types';

import HomeScreen from 'screens/main/HomeScreen';

const Stack = createNativeStackNavigator<StackParamList>();

const MainStack = () => (
  <Stack.Navigator initialRouteName={AppScreens.Home}>
    <Stack.Screen name={AppScreens.Home} component={HomeScreen} />
  </Stack.Navigator>
);

export default MainStack;
