import React from 'react';
import CodePush from 'react-native-code-push';

import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
  mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
  installMode: CodePush.InstallMode.IMMEDIATE,
})(App);
