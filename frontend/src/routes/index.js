import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "../components/header";
import Home from "../pages/home";
import Signup from "../pages/auth/Signup";
import Signin from "../pages/auth/Signin";

const Routes = (props) => {
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
      </Switch>
    </div>
  );
};

export default Routes;
