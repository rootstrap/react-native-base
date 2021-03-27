import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { LOGIN_SCREEN, SIGN_UP_SCREEN } from 'constants/screens';

import LoginScreen from 'screens/LoginScreen';
import SignUpScreen from 'screens/SignUpScreen';

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name={LOGIN_SCREEN} component={LoginScreen} />
    <Stack.Screen name={SIGN_UP_SCREEN} component={SignUpScreen} />
  </Stack.Navigator>
);

export default AuthStack;
