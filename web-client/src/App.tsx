import './App.css';
import MainMessage from './pages/MainMessage/MainMessage';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Home from './pages/Home/Home';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/dashboard">
          <MainMessage />
        </Route>
      </Switch>
    </Router>
  )
};
export default App;