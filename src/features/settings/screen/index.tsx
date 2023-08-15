import React from 'react';
import { Text, View } from 'react-native';

import Button from 'common/Button';

import { useLanguage, useTranslate } from 'localization/hooks';
import { Language } from 'localization/resources';

import styles from './styles';

const Settings = () => {
  const { setLanguage } = useLanguage();
  const { t } = useTranslate();

  const onChangeLanguage = (languageCode: Language) => {
    setLanguage(languageCode);
  };
  return (
    <View style={styles.container}>
      <Text>{t('screen.settings.updateLanguage')}</Text>
      <Button
        accessibilityState={{ disabled: false }}
        title={'Spanish'}
        onPress={() => onChangeLanguage('es')}
      />
      <Button
        accessibilityState={{ disabled: false }}
        title={'English'}
        onPress={() => onChangeLanguage('en')}
      />
      <Button
        accessibilityState={{ disabled: false }}
        title={'Arabic'}
        onPress={() => onChangeLanguage('ar')}
      />
    </View>
  );
};

export default Settings;
