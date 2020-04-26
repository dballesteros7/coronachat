import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en/translation';
import translationES from './locales/es/translation';
import translationIT from './locales/it/translation';

export const languageKey = 'language';

export enum Languages {
  en = 'en',
  es = 'es',
  it = 'it',
}

export type Language = keyof typeof Languages;

const resources = {
  en: {
    translation: translationEN,
  },
  es: {
    translation: translationES,
  },
  it: {
    translation: translationIT,
  },
};

const initLanguage = Languages[((localStorage.getItem(languageKey) ?? i18n.language) as Language) ?? 'en'];
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: initLanguage,
  });

export default i18n;
