import { useEffect, useState } from 'react';
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
  const cs = useColorScheme();

  const [userTheme] = Storage.GlobalStorageInstance.useValueListener('theme');
  const currentTheme = userTheme ?? cs!;
  const [colorScheme, setColorScheme] = useState(cs);
  const [isDefaultTheme, setIsDefaultTheme] = useState(userTheme === colorScheme);

  useEffect(() => {
    const event = Appearance.addChangeListener(({ colorScheme: newColorScheme }) => {
      setColorScheme(newColorScheme);
      Storage.GlobalStorageInstance.set('theme', newColorScheme as string);
    });
    return event.remove;
  }, []);

  const toggleTheme = () => {
    const newScheme = currentTheme === ColorScheme.dark ? ColorScheme.light : ColorScheme.dark;
    Storage.GlobalStorageInstance.set('theme', newScheme);
    setIsDefaultTheme(newScheme === colorScheme);
  };

  const toggleSystemTheme = () => {
    Storage.GlobalStorageInstance.set(
      'theme',
      !isDefaultTheme ? (colorScheme as string) : currentTheme,
    );
    setIsDefaultTheme(!isDefaultTheme);
  };

  return {
    theme: themes[currentTheme],
    toggleTheme,
    toggleSystemTheme,
    isDefaultTheme,
    currentTheme,
  };
};
