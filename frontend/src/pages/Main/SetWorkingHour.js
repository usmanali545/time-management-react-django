import "date-fns";
import React, { useState } from "react";
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
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const { me } = props;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const { working_hour } = data;
    if (
      isNaN(parseFloat(working_hour)) ||
      parseFloat(working_hour) <= 0 ||
      parseFloat(working_hour) >= 24
    ) {
      setError(true);
    } else {
      setError(false);
      const { setWorkingHour } = props;
      setWorkingHour({ working_hour });
      handleClose();
    }
  };

  return (
    <>
      <Button className={classes.button} onClick={handleOpen}>
        Set Working Hour
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
            <h2 id="transition-modal-title">Set working hour per day.</h2>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
              <TextField
                variant="outlined"
                type="number"
                margin="normal"
                required
                fullWidth
                id="workinghour"
                label="Working Hour"
                name="working_hour"
                autoComplete="workinghour"
                autoFocus
                inputRef={register}
                inputProps={{ step: 0.1 }}
                error={error}
                helperText={error && "Please input valid working hour."}
                defaultValue={me.working_hour}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Set Working Hour
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => {
  const { me } = state.auth;
  const { loading } = state.record;
  return {
    me,
    loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setWorkingHour: (params) => dispatch(actions.setWorkingHour(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRecord);
