import React from "react";
import {
  BrowserRouter,
  Switch,
  Router,
} from "react-router-dom";

import Route from './Route';

import SignIn from '../pages/Auth/SignIn';
import CreateNotifications from '../pages/Application/CreateNotifications';
import AlterPassword from '../pages/Application/AlterPassword';

import Maps from '../pages/Application/Maps';

export default function Routes() {
  return (  
   
        <Switch>
          <Route path="/" exact component={SignIn} />

          <Route path="/create-notifications" component={CreateNotifications} isPrivate />

          <Route path="/maps" component={Maps} isPrivate />

          <Route path="/alter-password" component={AlterPassword} isPrivate />

          <Route path="/" component={() => <h1>404</h1>} />
        </Switch>  

  );
}
