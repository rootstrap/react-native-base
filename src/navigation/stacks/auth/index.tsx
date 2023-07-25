import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from 'features/auth/sign-in/screen';
import SignUpScreen from 'features/auth/sign-up/screen';
import WelcomeScreen from 'features/auth/welcome/screen';

export enum AuthStackScreens {
  'Welcome' = 'Welcome',
  'SignIn' = 'SignIn',
  'SignUp' = 'SignUp',
}

export type AuthStackParamList = {
  [AuthStackScreens.Welcome]: undefined;
  [AuthStackScreens.SignIn]: undefined;
  [AuthStackScreens.SignUp]: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator: React.FunctionComponent = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name={AuthStackScreens.Welcome} component={WelcomeScreen} />
    <AuthStack.Screen name={AuthStackScreens.SignIn} component={SignInScreen} />
    <AuthStack.Screen name={AuthStackScreens.SignUp} component={SignUpScreen} />
  </AuthStack.Navigator>
);

export default AuthNavigator;
