import React, { useState } from "react";
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
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useForm } from "react-hook-form";

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
  profile: {
    textTransform: "none",
    marginRight: "10px",
  },
  navs: {
    flexGrow: 10,
  },
  nav: {
    cursor: "pointer",
    color: "white",
    padding: "0px 10px",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalPaper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "50%",
  },
}));

function Header(props) {
  const classes = useStyles();

  const { me, signout, editProfile } = props;
  let hasManagerAccess, hasAdminAccess;
  if (me) {
    const { role } = me;
    hasManagerAccess = role === "manager" || role === "admin";
    hasAdminAccess = role === "admin";
  }

  // Modal

  const [open, setOpen] = useState(false);
  const [namefError, setfNameError] = useState(null);
  const [namelError, setlNameError] = useState(null);
  const [nameErrorLog, setNameErrorLog] = useState(null);
  const { register, handleSubmit } = useForm();

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data) => {
    const { first_name, last_name, password } = data;
    data = {
      ...data,
      password: password !== "" ? password : undefined,
    };
    console.log("0-----", data);
    editProfile(data);
    handleClose();
  };

  const handleProfile = (row) => {
    setOpen(true);
  };

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
          {me && (
            <Button
              variant="contained"
              className={classes.profile}
              color="primary"
              onClick={handleProfile}
            >
              Profile
            </Button>
          )}
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
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.modalPaper}>
            <h2 id="transition-modal-title">Profile Edit</h2>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="first_name"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    inputRef={register}
                    defaultValue={me && me.first_name}
                    onChange={(e) => {
                      if (/\d/.test(e.target.value)) {
                        setfNameError(true);
                        setNameErrorLog("Invalid input");
                      } else {
                        setfNameError(false);
                      }
                    }}
                    error={namefError}
                    helperText={namefError && nameErrorLog}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="lastName"
                    required
                    label="Last Name"
                    name="last_name"
                    autoComplete="lname"
                    inputRef={register}
                    defaultValue={me && me.last_name}
                    onChange={(e) => {
                      if (/\d/.test(e.target.value)) {
                        setlNameError(true);
                        setNameErrorLog("Invalid input");
                      } else {
                        setlNameError(false);
                      }
                    }}
                    error={namelError}
                    helperText={namelError && nameErrorLog}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    inputRef={register}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="default"
                    className={classes.cancel}
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Edit Profile
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </Fade>
      </Modal>
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
    editProfile: (params) => dispatch(actions.editProfile(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
