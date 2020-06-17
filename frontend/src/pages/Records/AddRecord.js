import "date-fns";
import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { formatDate } from "../../utils/helpers/helper";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  recordsTable: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
function AddRecord(props) {
  const { getTotalUsers, totalUsers } = props;
  const classes = useStyles();
  const [userId, setUserId] = useState(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [dateAdded, setDateAdded] = useState(formatDate(new Date()));
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    getTotalUsers();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setDateAdded(formatDate(date));
  };

  const handleUserChange = (event, values) => {
    setUserId(values.id);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const { duration } = data;
    if (
      isNaN(parseFloat(duration)) ||
      parseFloat(duration) <= 0 ||
      parseFloat(duration) >= 24
    ) {
      setError(true);
    } else {
      setError(false);
      const { addRecord } = props;
      addRecord({ account_user_id: userId, ...data, added: dateAdded });
      handleClose();
    }
  };

  return (
    <>
      <Button className={classes.button} onClick={handleOpen}>
        Add record
      </Button>
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
            <h2 id="transition-modal-title">Add Details</h2>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
              <Autocomplete
                id="record-user"
                options={totalUsers && totalUsers.data}
                getOptionLabel={(option) =>
                  `${option.first_name} ${option.last_name}`
                }
                onChange={handleUserChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label="Assign User"
                    margin="normal"
                    variant="outlined"
                  />
                )}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="detail"
                label="Work Detail"
                name="detail"
                autoComplete="detail"
                autoFocus
                inputRef={register}
              />
              <Grid container spacing={3}>
                <Grid item xs={6} sm={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Choose Date"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                    variant="outlined"
                    type="number"
                    margin="normal"
                    required
                    fullWidth
                    id="duration"
                    label="Duration"
                    name="duration"
                    autoComplete="duration"
                    autoFocus
                    inputRef={register}
                    inputProps={{ step: 0.1 }}
                    error={error}
                    helperText={error && "Please input valid working hour."}
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
                Add Record
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
  const { totalUsers } = state.admin;
  return {
    totalUsers,
    loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addRecord: (params) => dispatch(actions.addRecord(params)),
    getTotalUsers: () => dispatch(actions.getTotalUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRecord);
