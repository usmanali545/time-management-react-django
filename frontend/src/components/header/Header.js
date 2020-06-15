import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  homeIcon: {
    marginRight: theme.spacing(2),
    color: "white",
  },
  link: {
    textDecoration: "none",
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  button: {
    textTransform: "none",
  },
  navs: {
    flexGrow: 10,
  },
  nav: {
    cursor: "pointer",
    color: "white",
    padding: "0px 10px",
  },
}));

function Header(props) {
  const classes = useStyles();

  const { me, signout } = props;
  let hasManagerAccess, hasAdminAccess;
  if (me) {
    const { role } = me;
    hasManagerAccess = role === "manager" || role === "admin";
    hasAdminAccess = role === "admin";
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <NavLink to="/">
            <IconButton
              edge="start"
              className={classes.homeIcon}
              color="default"
              aria-label="menu"
            >
              <HomeIcon />
            </IconButton>
          </NavLink>
          <Typography variant="h6" className={classes.title}>
            Working Hour Management
          </Typography>
          <Typography variant="h6" className={classes.navs}>
            {me && (
              <NavLink to="/main" className={classes.nav}>
                Main
              </NavLink>
            )}
            {hasManagerAccess && (
              <NavLink to="/users" className={classes.nav}>
                Users
              </NavLink>
            )}
            {hasAdminAccess && (
              <NavLink to="/records" className={classes.nav}>
                Records
              </NavLink>
            )}
          </Typography>
          {me ? (
            <Button
              variant="contained"
              className={classes.button}
              color="primary"
              onClick={signout}
            >
              Log out
            </Button>
          ) : (
            <a href="/signin" className={classes.link}>
              <Button
                variant="contained"
                className={classes.button}
                color="primary"
              >
                Login
              </Button>
            </a>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { me } = state.auth;
  return {
    me,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signout: () => dispatch(actions.signout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
