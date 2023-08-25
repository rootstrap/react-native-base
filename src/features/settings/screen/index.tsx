import React from 'react';
import { Switch, Text, TouchableOpacity, View } from 'react-native';

import { BLUE, GREY_01, WHITE } from 'constants/colors';

import { translate, useLanguage } from 'localization/hooks';
import { Language } from 'localization/resources';

import { ColorScheme } from 'themes/types';
import { useThemeConfig } from 'themes/useThemeConfig';

import useStyles from './styles';

const Settings = () => {
  const { language, setLanguage } = useLanguage();
  const { toggleTheme, currentTheme, toggleSystemTheme, isDefaultTheme } = useThemeConfig();
  const styles = useStyles();

  const onChangeLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <View style={styles.container}>
      <View style={styles.option}>
        <Text style={styles.optionTitle}>{translate('screen.settings.themes')}</Text>
        <View style={styles.row}>
          <Text style={styles.switchText}>{translate('screen.settings.systemDefault')}</Text>
          <Switch
            accessibilityState={{ disabled: false }}
            trackColor={{ false: GREY_01, true: BLUE }}
            thumbColor={WHITE}
            ios_backgroundColor={WHITE}
            onValueChange={toggleSystemTheme}
            value={isDefaultTheme}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.switchText}>{translate('screen.settings.darkMode')}</Text>
          <Switch
            accessibilityState={{ disabled: false }}
            trackColor={{ false: GREY_01, true: BLUE }}
            thumbColor={WHITE}
            ios_backgroundColor={WHITE}
            onValueChange={toggleTheme}
            value={currentTheme === ColorScheme.dark}
          />
        </View>
      </View>
      <View style={styles.option}>
        <Text style={styles.optionTitle}>{translate('screen.settings.changeLanguage')}</Text>
        <TouchableOpacity
          disabled={language === 'es'}
          onPress={() => onChangeLanguage('es')}
          style={[styles.button, language === 'es' && styles.disabledButton]}>
          <Text style={styles.buttonText}>Spanish</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={language === 'en'}
          onPress={() => onChangeLanguage('en')}
          style={styles.button}>
          <Text style={styles.buttonText}>English</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={language === 'ar'}
          onPress={() => onChangeLanguage('ar')}
          style={styles.button}>
          <Text style={styles.buttonText}>Arabic</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;
