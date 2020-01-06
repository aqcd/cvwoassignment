// Initialises store to provide for application and routes paths to respective components.
// Modify when new components are added to the application.

import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';

import todoStore from '../store/todoStore';

import Home from "../components/Home";
import Todos from "../components/Todos";
import NewTodo from "../components/NewTodo";
import EditTodo from "../components/EditTodo";

const store = todoStore();

export default (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/todos" exact component={Todos} />
        <Route path="/todos/new" exact component={NewTodo} />
        <Route path="/todo/:id/edit" exact component={EditTodo} />
      </Switch>
    </Router>
  </Provider>
);