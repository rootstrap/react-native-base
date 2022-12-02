import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthStackParamList } from 'navigation/types';

import SignInScreen from 'features/auth/sign-in/screen';
import SignUpScreen from 'features/auth/sign-up/screen';
import WelcomeScreen from 'features/auth/welcome/screen';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator: React.FunctionComponent = () => (
  <AuthStack.Navigator initialRouteName={'Welcome'}>
    <AuthStack.Screen name={'Welcome'} component={WelcomeScreen} />
    <AuthStack.Screen name={'SignIn'} component={SignInScreen} />
    <AuthStack.Screen name={'SignUp'} component={SignUpScreen} />
  </AuthStack.Navigator>
);

export default AuthNavigator;
