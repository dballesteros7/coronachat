import './App.css';
import MainMessage from './MainMessage';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {/* <Home /> */}
        </Route>
        <Route path="/dashboard">
          <MainMessage />
        </Route>
      </Switch>
    </Router>
  )
};
export default App;