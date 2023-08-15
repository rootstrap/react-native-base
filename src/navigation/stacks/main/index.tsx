import { useTranslate } from 'localization/hooks';
import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from 'features/home/screen';
import SettingScreen from 'features/settings/screen';

export enum MainStackScreens {
  'Home' = 'Home',
  'Settings' = 'Settings',
}

export type MainStackParamList = {
  [MainStackScreens.Home]: undefined;
  [MainStackScreens.Settings]: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack = () => {
  const { t } = useTranslate();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={MainStackScreens.Settings}
        component={SettingScreen}
        options={{ title: t('screen.settings.title') }}
      />
      <Stack.Screen name={MainStackScreens.Home} component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
