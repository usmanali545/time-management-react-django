import "date-fns";
import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Snackbar from "@material-ui/core/Snackbar";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { validateEmail } from "../../utils/helpers/validation";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: "white",
  },
  recordsTable: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "50%",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function AddUser(props) {
  const { me, addUser, status } = props;
  const hasAdminAccess = me.role === "admin";
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const [errorLog, setErrorLog] = useState(null);
  const [namefError, setfNameError] = useState(null);
  const [namelError, setlNameError] = useState(null);
  const [nameErrorLog, setNameErrorLog] = useState(null);
  const [role, setRole] = React.useState("regular");
  const [snackOpen, setSnackOpen] = useState(false);
  useEffect(() => {
    if (status === "ADD_USER_FAILED") {
      setSnackOpen(true);
    }
  }, [status]);

  const handleChange = (event) => {
    setRole(event.target.value);
  };
  const onSubmit = (data) => {
    const { email } = data;
    const valid = validateEmail(email);
    if (valid.valid) {
      setError(false);
      addUser({ role, ...data });
      handleClose();
    } else {
      setError(true);
      setErrorLog(valid.reason);
    }
  };

  const snackBarhandleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={2}>
          <Button
            className={classes.button}
            variant="contained"
            onClick={handleOpen}
            color="primary"
          >
            Add User
          </Button>
        </Grid>
        <Grid item xs={6} sm={9}>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={snackOpen}
            autoHideDuration={3000}
            onClose={snackBarhandleClose}
          >
            <Alert variant="filled" severity="error">
              The email you entered already exists. Please choose the other
              email.
            </Alert>
          </Snackbar>
        </Grid>
      </Grid>
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
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Add User</h2>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
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
                <Grid item xs={12} sm={4}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="last_name"
                    autoComplete="lname"
                    inputRef={register}
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
                <Grid item xs={12} sm={4}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="select-label">Role</InputLabel>
                    <Select
                      labelId="select-label"
                      id="demo-simple-select-outlined"
                      value={role}
                      required
                      name="role"
                      onChange={handleChange}
                      inputRef={register}
                    >
                      <MenuItem value={"regular"}>Regular User</MenuItem>
                      <MenuItem value={"manager"}>Manager</MenuItem>
                      {hasAdminAccess && (
                        <MenuItem value={"admin"}>Admin</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    inputRef={register}
                    error={error}
                    helperText={error && errorLog}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    inputRef={register}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Add User
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => {
  const { loading } = state.record;
  const { me } = state.auth;
  const { status } = state.admin;
  return {
    status,
    me,
    loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (params) => dispatch(actions.addUser(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
