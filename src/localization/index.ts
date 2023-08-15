import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';
import Localized from 'react-native-localization';
import Stores from 'storage';

import { resources } from './resources';

const DEFAULT_LANGUAGE = 'en';

const getLanguage = () => {
  const currentLanguage = Stores.GlobalStorageInstance.get('language');
  if (!currentLanguage) {
    const deviceLanguage = new Localized({}).getInterfaceLanguage();
    Stores.GlobalStorageInstance.set('language', deviceLanguage ?? DEFAULT_LANGUAGE);
    return deviceLanguage;
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
