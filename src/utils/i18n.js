import I18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';

import en from 'locale/en';
import es from 'locale/es';

const DEFAULT_LOCALE = 'en';
const LOCALES = RNLocalize.getLocales();

I18n.fallbacks = true;
I18n.missingBehaviour = 'guess';
I18n.defaultLocale = DEFAULT_LOCALE;
I18n.locale = LOCALES.length ? LOCALES[0].languageCode : DEFAULT_LOCALE;

I18n.translations = {
  en,
  es,
};

export const getCurrentLocale = () => I18n.locale;

export default I18n.translate.bind(I18n);
