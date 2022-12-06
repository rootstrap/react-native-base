import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MainStackParamList } from 'navigation/types';

import HomeScreen from 'features/home/screen';

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack = () => (
  <Stack.Navigator initialRouteName={'Home'}>
    <Stack.Screen name={'Home'} component={HomeScreen} />
  </Stack.Navigator>
);

export default MainStack;
