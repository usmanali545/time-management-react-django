import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Header from "../components/header";
import Home from "../pages/home";
import Signup from "../pages/auth/Signup";
import Signin from "../pages/auth/Signin";
import Main from "../pages/Main";
import Users from "../pages/Users";
import Records from "../pages/Records";

const Routes = (props) => {
  const { me } = props;
  let hasManagerAccess, hasAdminAccess;
  if (me) {
    const { role } = me;
    hasManagerAccess = role === "manager" || role === "admin";
    hasAdminAccess = role === "admin";
  }
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        {!me && <Route exact path="/signup" component={Signup} />}
        {!me && <Route exact path="/signin" component={Signin} />}
        {me && <Route exact path="/main" component={Main} />}
        {hasManagerAccess && <Route exact path="/users" component={Users} />}
        {hasAdminAccess && <Route exact path="/records" component={Records} />}
        <Route path="*" render={() => <Redirect to="/" />} />
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { me } = state.auth;
  return {
    me,
  };
};

export default connect(mapStateToProps, null)(Routes);
