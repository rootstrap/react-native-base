import ar from './ar.json';
import en from './en.json';
import es from './es.json';

export const resources = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
  ar: {
    translation: ar,
  },
};

export type Language = keyof typeof resources;
