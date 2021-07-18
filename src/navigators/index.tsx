import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { APP_STACK } from '../constants/screens';
import AppStack from './AppStack';

const _XHR = GLOBAL.originalXMLHttpRequest ? GLOBAL.originalXMLHttpRequest : GLOBAL.XMLHttpRequest;

XMLHttpRequest = _XHR;

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name={APP_STACK} component={AppStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
