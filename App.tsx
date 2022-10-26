import NavigationStack from 'navigation/index';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <NavigationStack />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
