import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StackParamList } from 'navigation/types';
import { AppScreens } from 'navigation/types';

import WelcomeScreen from 'screens/auth/WelcomeScreen';

const AuthStack = createNativeStackNavigator<StackParamList>();

const AuthNavigator: React.FunctionComponent = () => (
  <AuthStack.Navigator initialRouteName={AppScreens.Welcome}>
    <AuthStack.Screen name={AppScreens.Welcome} component={WelcomeScreen} />
  </AuthStack.Navigator>
);

export default AuthNavigator;
