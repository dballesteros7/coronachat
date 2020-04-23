import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { User } from './model/model';
import DashboardAuthCheck from './components/DashboardAuthCheck/DashboardAuthCheck';
import MainMessage from './pages/MainMessage/MainMessage';
import LanguageProvider from './providers/LanguageProvider/LanguageProvider';

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

export enum Routes {
  Root = '/',
  Dashboard = '/dashboard',
  DashboardTrial = '/dashboard/trial',
}

export const UserContext = React.createContext({ user: { id: '', authToken: '' }, setUser: (_?: User) => {} });

const useLocalStorage = <T,>(key: string, defaultState: T): [T, (newValue?: T) => void] => {
  const initState = () => JSON.parse(window.localStorage.getItem(key) || JSON.stringify(defaultState)) as T;
  const [storageValue, setStorageInState] = useState(initState);
  const setStorageValue = (newValue?: T) => {
    setStorageInState(newValue ?? defaultState);
    newValue ? window.localStorage.setItem(key, JSON.stringify(newValue)) : window.localStorage.removeItem(key);
  };
  return [storageValue, setStorageValue];
};

const App = () => {
  let [user, setUser] = useLocalStorage('user', { id: '', authToken: '' });
  return (
    <Router>
      <UserContext.Provider value={{ user: user, setUser: setUser }}>
        <ThemeProvider theme={theme}>
          <LanguageProvider>
            <Switch>
              <Route exact path={Routes.DashboardTrial}>
                <MainMessage isTrial={true} />
              </Route>
              <Route exact path={Routes.Dashboard}>
                <DashboardAuthCheck />
              </Route>
              <Route path={Routes.Root}>
                <Home />
              </Route>
            </Switch>
          </LanguageProvider>
        </ThemeProvider>
      </UserContext.Provider>
    </Router>
  );
};
export default App;
