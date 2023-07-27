import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from 'features/home/screen';

export enum MainStackScreens {
  'Home' = 'Home',
}

export type MainStackParamList = {
  [MainStackScreens.Home]: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack = () => (
  <Stack.Navigator>
    <Stack.Screen name={MainStackScreens.Home} component={HomeScreen} />
  </Stack.Navigator>
);

export default MainStack;
