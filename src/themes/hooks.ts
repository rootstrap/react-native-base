import { useState } from 'react';
import { Appearance, useColorScheme } from 'react-native';

import type { Theme } from '@react-navigation/native';

import Storage from 'storage';

import DarkTheme from './dark';
import LightTheme from './light';

const DEFAULT_SCHEME = 'light';

const themes: Record<string, Theme> = {
  dark: { ...DarkTheme },
  light: { ...LightTheme },
};

export enum ColorScheme {
  dark = 'dark',
  light = 'light',
}

export const useThemeConfig = () => {
  const colorScheme = useColorScheme();
  const currentScheme = Storage.GlobalStorageInstance.get('theme');
  const [theme, setTheme] = useState<string | undefined>(currentScheme);

  const loadTheme = () => {
    const scheme = currentScheme ?? colorScheme ?? DEFAULT_SCHEME;
    if (!currentScheme) {
      Storage.GlobalStorageInstance.set('theme', scheme);
    }

    return themes[scheme];
  };

  const toggleTheme = () => {
    const newScheme = theme === ColorScheme.dark ? ColorScheme.light : ColorScheme.dark;
    Appearance.setColorScheme(newScheme);
    Storage.GlobalStorageInstance.set('theme', newScheme);
    setTheme(newScheme);
  };

  return {
    theme: loadTheme(),
    toggleTheme,
    currentTheme: theme,
    isDarkMode: theme === ColorScheme.dark,
  };
};
