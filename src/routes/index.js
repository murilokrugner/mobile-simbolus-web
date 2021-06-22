import React from "react";
import {
  BrowserRouter,
  Switch,
} from "react-router-dom";

import Route from './Route';

import SignIn from '../pages/Auth/SignIn';
import CreateNotifications from '../pages/Application/CreateNotifications';

import Maps from '../pages/Application/Maps';

export default function Routes() {
  return (
    <BrowserRouter>
        <Switch>
          <Route path="/" exact component={SignIn} />

          <Route path="/create-notifications" component={CreateNotifications} isPrivate />

          <Route path="/maps" component={Maps} isPrivate />

          <Route path="/" component={() => <h1>404</h1>} />
        </Switch>
    </BrowserRouter>
  );
}
