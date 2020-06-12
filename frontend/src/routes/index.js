import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "../components/header";
import Home from "../pages/home";
import Signup from "../pages/auth/Signup";
import Signin from "../pages/auth/Signin";
import Main from "../pages/Main";

const Routes = (props) => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/main" component={Main} />
      </Switch>
    </div>
  );
};

export default Routes;
