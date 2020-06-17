import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import { formatDate } from "../utils/helpers/helper";

function OwnRecordTableHead(props) {
  const { classes, order, orderBy, onRequestSort, headCells } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, key) => (
          <TableCell
            key={key}
            align={headCell.align}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.id !== "action" ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </span>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

OwnRecordTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: "1 1 100%",
  },
}));

const TableToolbar = (props) => {
  const { saveOwnRecordPageInfo, ownRecordPageInfo, getOwnRecords } = props;
  const classes = useToolbarStyles();
  const [selectedFromDate, setSelectedFromDate] = useState(
    ownRecordPageInfo.from
  );
  const [selectedToDate, setSelectedToDate] = useState(ownRecordPageInfo.to);

  useEffect(() => {
    saveOwnRecordPageInfo({
      ...ownRecordPageInfo,
      from: selectedFromDate,
      to: selectedToDate,
    });
    getOwnRecords({
      ...ownRecordPageInfo,
      from: selectedFromDate,
      to: selectedToDate,
    });
  }, [
    selectedFromDate,
    selectedToDate,
    saveOwnRecordPageInfo,
    getOwnRecords,
    ownRecordPageInfo,
  ]);

  const handleDateFromChange = (date) => {
    setSelectedFromDate(formatDate(new Date(date)));
  };

  const handleDateToChange = (date) => {
    setSelectedToDate(formatDate(new Date(date)));
  };

  return (
    <Toolbar className={classes.root}>
      <Typography
        className={classes.title}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        {props.title}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={6}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="From"
              value={selectedFromDate}
              onChange={handleDateFromChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              maxDate={selectedToDate}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={6} sm={6}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="To"
              value={selectedToDate}
              onChange={handleDateToChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              minDate={selectedFromDate}
              maxDate={new Date()}
            />
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>
    </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  actionButtons: {
    margin: theme.spacing(1),
  },
  actionDeleteButtons: {
    margin: theme.spacing(1),
    color: "red",
  },
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
  submit: {
    margin: theme.spacing(3, 2, 2),
  },
  cancel: {
    margin: theme.spacing(3, 2, 2),
  },
  modalPaper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  backgroundRed: {
    backgroundColor: "#f381a7",
  },
  backgroundGreen: {
    backgroundColor: "#a2cf6e",
  },
}));

function OwnRecordTable(props) {
  const classes = useStyles();
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("added");
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const {
    me,
    getOwnRecords,
    ownRecords,
    headCells,
    actions,
    saveOwnRecordPageInfo,
    ownRecordPageInfo,
  } = props;

  // Edit Modal
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [dateEdited, setDateEdited] = useState(formatDate(new Date()));
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [editRecordId, setEditRecordId] = useState(null);
  const [editDuration, setEditDuration] = useState(0);
  const [editDetail, setEditDetail] = useState("");
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
      const { detail, duration } = data;
      const { editOwnRecord } = props;
      editOwnRecord({ id: editRecordId, detail, duration, added: dateEdited });
      handleClose();
    }
  };

  useEffect(() => {
    saveOwnRecordPageInfo({
      ...ownRecordPageInfo,
      order,
      orderBy,
      page,
      rowsPerPage,
    });
    getOwnRecords({ ...ownRecordPageInfo, order, orderBy, page, rowsPerPage });
  }, [
    order,
    orderBy,
    page,
    rowsPerPage,
    saveOwnRecordPageInfo,
    getOwnRecords,
    ownRecordPageInfo,
  ]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setDateEdited(formatDate(date));
  };

  const handleEdit = (row) => {
    setOpen(true);
    setSelectedDate(new Date(row.added));
    setDateEdited(formatDate(new Date(row.added)));
    setEditDetail(row.detail);
    setEditDuration(row.duration);
    setEditRecordId(row.id);
  };

  const handleClose = () => {
    setError(false);
    setOpen(false);
  };

  // Delete Modal
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});

  const handleDeleteOpen = (row) => {
    setOpenDelete(true);
    setSelectedRow(row);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  const handleDelete = () => {
    const { deleteOwnRecord } = props;
    deleteOwnRecord({ id: selectedRow.id });
    handleDeleteClose();
  };
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableToolbar
          title={props.title}
          saveOwnRecordPageInfo={saveOwnRecordPageInfo}
          ownRecordPageInfo={ownRecordPageInfo}
          getOwnRecords={getOwnRecords}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="admin table"
          >
            <OwnRecordTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              headCells={headCells}
            />
            <TableBody>
              {ownRecords &&
                ownRecords.data.map((row, index) => {
                  const labelId = `admin-table-checkbox-${index}`;

                  return (
                    <TableRow
                      className={
                        row.duration_sum < parseFloat(me.working_hour)
                          ? classes.backgroundRed
                          : classes.backgroundGreen
                      }
                      tabIndex={-1}
                      key={index}
                    >
                      <TableCell component="th" id={labelId} scope="row">
                        {row.detail}
                      </TableCell>
                      <TableCell align="left">{row.added}</TableCell>
                      <TableCell align="left">{row.duration}</TableCell>
                      {actions ? (
                        <TableCell align="center">
                          <Button
                            className={classes.actionButtons}
                            variant="contained"
                            color="primary"
                            onClick={() => handleEdit(row)}
                          >
                            Edit
                          </Button>
                          <Button
                            className={classes.actionDeleteButtons}
                            variant="contained"
                            onClick={() => handleDeleteOpen(row)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      ) : null}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={ownRecords && ownRecords.total_records}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
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
            <h2 id="transition-modal-title">Edit Details</h2>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
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
                defaultValue={editDetail}
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
                      maxDate={new Date()}
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
                    defaultValue={editDuration}
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
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
                <Grid item xs={6} sm={6}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Edit Record
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </Fade>
      </Modal>
      <Dialog
        open={openDelete}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Record"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to delete this record?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDeleteClose}
            variant="contained"
            color="default"
            className={classes.cancel}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            color="secondary"
            autoFocus
            className={classes.submit}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { me } = state.auth;
  const { ownRecordPageInfo, ownRecords } = state.record;
  const { loading } = state.record;
  return {
    me,
    ownRecords,
    loading,
    ownRecordPageInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveOwnRecordPageInfo: (params) =>
      dispatch(actions.saveOwnRecordPageInfo(params)),
    editOwnRecord: (params) => dispatch(actions.editOwnRecord(params)),
    deleteOwnRecord: (params) => dispatch(actions.deleteOwnRecord(params)),
    getOwnRecords: (params) => dispatch(actions.getOwnRecords(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OwnRecordTable);
