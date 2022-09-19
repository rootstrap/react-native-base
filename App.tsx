import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import WelcomeScreen from 'screens/WelcomeScreen';

import { WELCOME_SCREEN } from 'constants/screens';

const queryClient = new QueryClient();

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={WELCOME_SCREEN}>
          <Stack.Screen name={WELCOME_SCREEN} component={WelcomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
