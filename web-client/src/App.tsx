import MainMessage from './pages/MainMessage/MainMessage';
import React, { ReactNode } from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation, useHistory } from 'react-router-dom';
import Home from './pages/Home/Home';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { Language, Languages, languageKey } from './i18n';
import { useTranslation } from 'react-i18next';

const theme = createMuiTheme({
  palette: {
    primary: {
      // Whatsapp top bar green
      main: '#1EBEA5',
    },
    secondary: {
      main: '#FFFFFF',
    },
    error: {
      main: '#DE5347',
    },
  },
});

export const LanguageContext = React.createContext({
  selectedLanguage: Languages.en,
  onLanguageSelected: (_: Language) => {},
});

const LanguageWrapper = (props: { children: ReactNode }) => {
  const query = new URLSearchParams(useLocation().search);
  const [_, i18n] = useTranslation();
  const location = useLocation();
  const history = useHistory();

  let selectedLanguage = Languages[(i18n.language as Language) ?? 'en'];
  const requestedLanguage = query.get('lang') as Language;

  const setLanguage = (language: Languages) => {
    i18n.changeLanguage(language);
    localStorage.setItem(languageKey, language);
  };

  if (requestedLanguage && requestedLanguage != selectedLanguage) {
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

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <LanguageWrapper>
          <Switch>
            <Route exact path="/dashboard">
              <MainMessage isTrial={true} />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </LanguageWrapper>
      </ThemeProvider>
    </Router>
  );
};
export default App;
