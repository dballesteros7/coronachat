import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import translationEN from './locales/en/translation';
import translationES from './locales/es/translation';
import translationIT from './locales/it/translation';
import React, { ReactNode } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

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

export const LanguageContext = React.createContext({
  selectedLanguage: Languages.en,
  onLanguageSelected: (_: Language) => {},
});

export const LanguageProvider = (props: { children: ReactNode }) => {
  const query = new URLSearchParams(useLocation().search);
  const { i18n } = useTranslation();
  const location = useLocation();
  const history = useHistory();

  let selectedLanguage = Languages[(i18n.language as Language) ?? 'en'];
  const requestedLanguage = query.get('lang') as Language;

  const setLanguage = (language: Languages) => {
    i18n.changeLanguage(language);
    localStorage.setItem(languageKey, language);
  };

  if (requestedLanguage && requestedLanguage !== selectedLanguage) {
    selectedLanguage = Languages[requestedLanguage];
    setLanguage(selectedLanguage);
  }

  const onLanguageSelected = (language: Language) => {
    selectedLanguage = Languages[language];
    setLanguage(Languages[language]);
    history.push(location.pathname + '?lang=' + language);
  };

  return (
    <LanguageContext.Provider value={{ selectedLanguage: selectedLanguage, onLanguageSelected: onLanguageSelected }}>
      {props.children}
    </LanguageContext.Provider>
  );
};

export default i18n;
