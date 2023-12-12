import React from 'react';
import { Switch, Text, View } from 'react-native';

import Button from 'common/Button';

import { BLUE, GREY_01, WHITE } from 'constants/colors';

import { translate, useLanguage } from 'localization/hooks';
import { Language } from 'localization/resources';

import { useThemeConfig } from 'themes/hooks';

import useStyles from './styles';

const Settings = () => {
  const { language, setLanguage } = useLanguage();
  const { toggleTheme, isDarkMode } = useThemeConfig();
  const styles = useStyles();

  const onChangeLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <View style={styles.container}>
      <View style={styles.option}>
        <Text style={styles.optionTitle}>{translate('screen.settings.themes')}</Text>

        <View style={styles.row}>
          <Text style={styles.switchText}>{translate('screen.settings.darkMode')}</Text>
          <Switch
            accessibilityState={{ disabled: false }}
            trackColor={{ false: GREY_01, true: BLUE }}
            thumbColor={WHITE}
            ios_backgroundColor={WHITE}
            onValueChange={toggleTheme}
            value={isDarkMode}
          />
        </View>
      </View>
      <View style={styles.option}>
        <Text style={styles.optionTitle}>{translate('screen.settings.changeLanguage')}</Text>
        <Button
          title="Spanish"
          disabled={language === 'es'}
          onPress={() => onChangeLanguage('es')}
          style={[styles.button, language === 'es' && styles.disabledButton]}
        />
        <Button
          title="English"
          disabled={language === 'en'}
          onPress={() => onChangeLanguage('en')}
          style={styles.button}
        />
        <Button
          title="Arabic"
          disabled={language === 'ar'}
          onPress={() => onChangeLanguage('ar')}
          style={styles.button}
        />
      </View>
    </View>
  );
};

export default Settings;
