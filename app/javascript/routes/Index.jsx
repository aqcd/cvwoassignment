{/* Routes paths to respective components. */}

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Todos from "../components/Todos";
import NewTodo from "../components/NewTodo";
import EditTodo from "../components/EditTodo";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/todos" exact component={Todos} />
      <Route path="/todos/new" exact component={NewTodo} />
      <Route path="/todo/:id/edit" exact component={EditTodo} />
    </Switch>
  </Router>
);