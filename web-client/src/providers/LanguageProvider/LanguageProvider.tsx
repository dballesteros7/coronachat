import React, { ReactNode } from 'react';
import './LanguageProvider.scss';
import { Languages, Language, languageKey } from '../../i18n';
import { useLocation, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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

export default LanguageProvider;
