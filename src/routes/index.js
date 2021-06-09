import React from "react";
import {
  Switch,
  Route,
} from "react-router-dom";

import SignIn from '../pages/Auth/SignIn';
import Dashboard from '../pages/Application/Dashboard';

export default function Routes() {
  return (
        <Switch>
          <Route path="/" exact component={SignIn} />

          <Route path="/dashboard" component={Dashboard} isPrivate />

          <Route path="/" component={() => <h1>404</h1>} />
        </Switch>
  );
}
