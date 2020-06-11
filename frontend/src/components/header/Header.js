import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import { NavLink } from "react-router-dom";

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
}));

function Header(props) {
  const classes = useStyles();

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
          <a href="/signin" className={classes.link}>
            <Button variant="contained" color="primary">
              Login
            </Button>
          </a>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
