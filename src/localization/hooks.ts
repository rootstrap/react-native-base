import i18n from 'i18next';
import { I18nManager } from 'react-native';
import Restart from 'react-native-restart';
import Stores from 'storage';

import { RecursiveKeyOf } from 'constants/types';

import { Language, resources } from './resources';

type DefaultLocale = typeof resources.en.translation;
export type TxKeyPath = RecursiveKeyOf<DefaultLocale>;

export const translate = (key: TxKeyPath, options?: any) =>
  i18n.t(key, options) as unknown as string;

export const useLanguage = () => {
  const currentLanguage = Stores.GlobalStorageInstance.get('language');

  const setLanguage = (language: Language) => {
    i18n.changeLanguage(language, () => {
      const isRTL = language === 'ar';
      I18nManager.forceRTL(isRTL);
      I18nManager.allowRTL(isRTL);
      Stores.GlobalStorageInstance.set('language', language);
      Restart.restart();
    });
  };

  return {
    language: currentLanguage,
    setLanguage,
  };
};
