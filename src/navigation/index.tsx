import React, { useEffect } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthStack from 'navigation/stacks/auth';
import MainStack from 'navigation/stacks/main';

import useCodePush from 'features/code-push/hooks/useCodePush';
import InAppSplash from 'features/code-push/screen';

import { GlobalStore } from 'storage/stores';

import { RootStackParamList } from './types';

const AppStack = createNativeStackNavigator<RootStackParamList>();

// TODO: Move this START
const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
  const [user] = GlobalStore.user.useValueListener();

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {!user ? (
        <RootStack.Screen name={'Auth'} component={AuthStack} />
      ) : (
        <RootStack.Screen name={'Main'} component={MainStack} />
      )}
    </RootStack.Navigator>
  );
};

// TODO: Move this END

const NavigationStack: React.FunctionComponent = () => {
  const { checkForUpdate, updateAvailable } = useCodePush();

  useEffect(() => {
    checkForUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {updateAvailable ? (
        <AppStack.Screen name={'InAppSplash'} component={InAppSplash} />
      ) : (
        <AppStack.Screen name={'RootStack'} component={RootNavigator} />
      )}
    </AppStack.Navigator>
  );
};

export default NavigationStack;
