import 'localization';
import React from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer, useTheme } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import NavigationStack from 'navigation';

import { useThemeConfig } from 'themes/hooks';

const client = new QueryClient();

const App = () => {
  const { theme } = useThemeConfig();
  const { dark: isDarkMode } = useTheme();
  return (
    <QueryClientProvider client={client}>
      <NavigationContainer theme={theme}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <NavigationStack />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
