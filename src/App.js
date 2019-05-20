import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  UserIsAuthenticated,
  UserIsNotAuthenticated,
  UserIsAdmin
} from "./Helper/Auth";

import { Provider } from "react-redux";
import store from "./store";

import AppNavbar from "./Components/Layout/AppNavbar";
import Dashboard from "./Components/Layout/Dashboard";
import AddBook from "./Components/Books/AddBook";
import BookDetails from "./Components/Books/BookDetails";
import EditBook from "./Components/Books/EditBook";
import Login from "./Components/Auth/Login.js";
import Register from "./Components/Auth/Register.js";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <AppNavbar />
            <div className="container">
              <Switch>
                <Route
                  exact
                  path="/"
                  component={UserIsAuthenticated(Dashboard)}
                />
                <Route
                  exact
                  path="/book/add"
                  component={UserIsAdmin(AddBook)}
                />
                <Route
                  exact
                  path="/book/edit/:id"
                  component={UserIsAdmin(EditBook)}
                />
                <Route
                  exact
                  path="/book/:id"
                  component={UserIsAuthenticated(BookDetails)}
                />
                <Route
                  exact
                  path="/login"
                  component={UserIsNotAuthenticated(Login)}
                />
                <Route
                  exact
                  path="/register"
                  component={UserIsNotAuthenticated(Register)}
                />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
