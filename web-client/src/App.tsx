import MainMessage from './pages/MainMessage/MainMessage';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation, useHistory } from 'react-router-dom';
import Home from './pages/Home/Home';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import i18n, { Language, Languages, languageKey } from './i18n';
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

const LanguageWrapper = () => {
  const query = new URLSearchParams(useLocation().search);
  const [_, i18n] = useTranslation();
  const location = useLocation();
  const history = useHistory();

  let selectedLanguage = Languages[(i18n.language as Language) ?? 'en'];
  const requestedLanguage = query.get('lang') as Language;
  if (requestedLanguage && requestedLanguage != selectedLanguage) {
    const selectedLanguage = Languages[requestedLanguage];
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem(languageKey, selectedLanguage);
  }

  const onLanguageSelected = (language: Language) => {
    const newLanguage = Languages[language];
    i18n.changeLanguage(newLanguage);
    localStorage.setItem(languageKey, newLanguage);
    history.push(location.pathname + '?lang=' + newLanguage);
  };

  return (
    <Switch>
      <Route path="/dashboard">
        <MainMessage isTrial={true} />
      </Route>
      <Route path="/">
        <Home selectedLanguage={selectedLanguage} onLanguageSelected={onLanguageSelected} />
      </Route>
    </Switch>
  );
};

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <LanguageWrapper />
      </ThemeProvider>
    </Router>
  );
};
export default App;
