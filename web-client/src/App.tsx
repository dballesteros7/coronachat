import MainMessage from './pages/MainMessage/MainMessage';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
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

const LanguageWrapper = (props: any) => {
  const query = new URLSearchParams(useLocation().search);
  const [_, i18n] = useTranslation();

  useEffect(() => {
    const requestedLanguage = query.get('lang') as Language;
    if (requestedLanguage) {
      const requestedLanguageValue = Languages[requestedLanguage];
      i18n.changeLanguage(requestedLanguageValue);
      localStorage.setItem(languageKey, requestedLanguageValue);
    }
  }, []);

  return <>{props.children}</>;
};

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <LanguageWrapper>
          <Switch>
            <Route path="/dashboard">
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
