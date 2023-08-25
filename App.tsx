import 'localization';
import React, { useState } from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer, useTheme } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import AnimatedBootSplash from 'common/AnimatedSplash';

import NavigationStack from 'navigation';

import { useThemeConfig } from 'themes/useThemeConfig';

const client = new QueryClient();

const App = () => {
  const { theme } = useThemeConfig();
  const { dark: isDarkMode } = useTheme();
  const [visible, setVisible] = useState(true);

  if (visible) {
    return <AnimatedBootSplash onAnimationEnd={() => setVisible(false)} />;
  }
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
