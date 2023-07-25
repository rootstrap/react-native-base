import React, { useEffect, useRef } from 'react';
import RNBootSplash from 'react-native-bootsplash';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthStack from 'navigation/stacks/auth';
import MainStack from 'navigation/stacks/main';

import { GlobalStore } from 'storage/stores';

const AppStack = createNativeStackNavigator();

const NavigationStack: React.FunctionComponent = () => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [user] = GlobalStore.user.useValueListener();

  useEffect(() => {
    timerRef.current = setTimeout(() => RNBootSplash.hide({ fade: true }), 3000);
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {!user ? (
        <AppStack.Screen name={'Auth'} component={AuthStack} />
      ) : (
        <AppStack.Screen name={'Main'} component={MainStack} />
      )}
    </AppStack.Navigator>
  );
};

export default NavigationStack;
