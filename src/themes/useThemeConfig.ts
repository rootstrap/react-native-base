import { Appearance, useColorScheme } from 'react-native';

import type { Theme } from '@react-navigation/native';

import Storage from 'storage';

import DarkTheme from './dark';
import LightTheme from './light';
import { ColorScheme } from './types';

const themes: Record<string, Theme> = {
  dark: { ...DarkTheme },
  light: { ...LightTheme },
};

export const useThemeConfig = () => {
  const colorScheme = useColorScheme();
  const [userTheme] = Storage.GlobalStorageInstance.useValueListener('theme');
  const currentTheme = userTheme ?? colorScheme!;

  const toggleTheme = () => {
    const newScheme = currentTheme === ColorScheme.dark ? ColorScheme.light : ColorScheme.dark;
    Appearance.setColorScheme(newScheme);
    Storage.GlobalStorageInstance.set('theme', newScheme);
  };

  return {
    theme: themes[currentTheme],
    toggleTheme,
    currentTheme,
  };
};
