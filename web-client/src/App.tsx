import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import DashboardAuthCheck from './components/DashboardAuthCheck/DashboardAuthCheck';
import MainMessage from './pages/MainMessage/MainMessage';
import LanguageProvider from './providers/LanguageProvider/LanguageProvider';
import ErrorHandlingProvider from './providers/ErrorHandlingProvider/ErrorHandlingProvider';
import UserProvider from './providers/UserProvider/UserProvider';

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

const App = () => {
  return (
    <Router>
      <LanguageProvider>
        <ErrorHandlingProvider>
          <UserProvider>
            <ThemeProvider theme={theme}>
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
            </ThemeProvider>
          </UserProvider>
        </ErrorHandlingProvider>
      </LanguageProvider>
    </Router>
  );
};
export default App;
