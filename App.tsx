import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CodePush from 'react-native-code-push'

import NavigationStack from 'navigation';

const client = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={client}>
      <NavigationContainer>
        <NavigationStack />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default CodePush(App);
