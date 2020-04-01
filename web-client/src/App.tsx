import MainMessage from "./pages/MainMessage/MainMessage";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      // Whatsapp top bar green
      main: "#1EBEA5"
    },
    secondary: {
      main: "#FFFFFF"
    },
    error: {
      main: "#DE5347"
    }
  }
});

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/dashboard">
            <MainMessage isTrial={true} />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </ThemeProvider>
    </Router>
  );
};
export default App;
