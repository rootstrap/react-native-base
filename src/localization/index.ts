import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';
import Storage from 'storage';

import { resources } from './resources';

const DEFAULT_LANGUAGE = 'en';

const getLanguage = () => {
  const currentLanguage = Storage.GlobalStorageInstance.get('language');
  if (!currentLanguage) {
    // Detect device language, could be done with react-native-device-info
    // but for the sake of this example we will use the default language
    Storage.GlobalStorageInstance.set('language', DEFAULT_LANGUAGE);
    return DEFAULT_LANGUAGE;
  }

  return currentLanguage;
};

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: getLanguage(),
  resources,
  compatibilityJSON: 'v3',
  interpolation: {
    escapeValue: false,
  },
});

export const isRTL: boolean = i18n.dir() === 'rtl';

I18nManager.allowRTL(isRTL);
I18nManager.forceRTL(isRTL);

export default i18n;
