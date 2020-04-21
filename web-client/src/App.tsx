import MainMessage from './pages/MainMessage/MainMessage';
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { LanguageWrapper } from './i18n';
import { User } from './model/model';

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

export const UserContext = React.createContext({ user: { id: '', authToken: '' }, setUser: (_: User) => {} });

const useUserInLocalStorage = () => {
  const key = 'user';
  const initState = () => {
    const emptyUser = { id: '', authToken: '' };
    return JSON.parse(window.localStorage.getItem(key) || JSON.stringify(emptyUser));
  };
  const [user, setUser] = useState(initState);
  const storeUser = (newUser: User) => {
    setUser(newUser);
    window.localStorage.setItem(key, JSON.stringify(newUser));
  };
  // TODO(MB) why do I need this as const to make types work?
  return [user, storeUser] as const;
};

const App = () => {
  const [user, setUser] = useUserInLocalStorage();

  return (
    <Router>
      <UserContext.Provider value={{ user: user, setUser: setUser }}>
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
      </UserContext.Provider>
    </Router>
  );
};
export default App;
