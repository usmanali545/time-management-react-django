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
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import { formatDate } from "../utils/helpers/helper";

function AdminTableHead(props) {
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
            {headCell.id !== "action" && headCell.id !== "account_user" ? (
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

AdminTableHead.propTypes = {
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
  const classes = useToolbarStyles();

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
}));

function AdminTable(props) {
  const classes = useStyles();
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("added");
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const {
    headCells,
    actions,
    savePageInfo,
    getRecords,
    records,
    totalUsers,
    getTotalUsers,
  } = props;

  useEffect(() => {
    getTotalUsers();
  }, [getTotalUsers]);

  // Edit Modal
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [dateEdited, setDateEdited] = useState(formatDate(new Date()));
  const [recordUserFullName, setRecordUserFullName] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [editRecordId, setEditRecordId] = useState(null);
  const [editDuration, setEditDuration] = useState(0);
  const [editDetail, setEditDetail] = useState("");
  const [editRecordUserId, setEditRecordUserId] = useState("");
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
      const { editRecord } = props;
      editRecord({
        id: editRecordId,
        account_user: editRecordUserId,
        detail,
        duration,
        added: dateEdited,
      });
      handleClose();
    }
  };

  useEffect(() => {
    savePageInfo({ order, orderBy, page, rowsPerPage });
    getRecords({ order, orderBy, page, rowsPerPage });
  }, [order, orderBy, page, rowsPerPage, savePageInfo, getRecords]);

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
    setRecordUserFullName(row.full_name);
    setDateEdited(formatDate(new Date(row.added)));
    setEditDetail(row.detail);
    setEditDuration(row.duration);
    setEditRecordId(row.id);
    setEditRecordUserId(row.account_user);
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
    const { deleteRecord } = props;
    deleteRecord({ id: selectedRow.id });
    handleDeleteClose();
  };

  const handleUserChange = (event, values) => {
    values && setEditRecordUserId(values.id);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableToolbar title={props.title} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="admin table"
          >
            <AdminTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              headCells={headCells}
            />
            <TableBody>
              {records &&
                records.data.map((row, index) => {
                  const labelId = `admin-table-checkbox-${index}`;

                  return (
                    <TableRow tabIndex={-1} key={index}>
                      <TableCell component="th" id={labelId} scope="row">
                        {row.full_name}
                      </TableCell>
                      <TableCell id={labelId} scope="row">
                        {row.detail}
                      </TableCell>
                      <TableCell align="left">{row.added}</TableCell>
                      <TableCell align="left">{row.duration}</TableCell>
                      {actions ? (
                        <TableCell align="center">
                          <Button
                            className={classes.actionButtons}
                            variant="outlined"
                            color="primary"
                            onClick={() => handleEdit(row)}
                          >
                            Edit
                          </Button>
                          <Button
                            className={classes.actionButtons}
                            variant="outlined"
                            color="secondary"
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
          count={records ? records.total_records : 0}
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
                    label="Assign User"
                    margin="normal"
                    variant="outlined"
                    required
                  />
                )}
                defaultValue={{ first_name: recordUserFullName, last_name: "" }}
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
  const { loading, records } = state.record;
  const { totalUsers } = state.admin;
  return {
    records,
    loading,
    totalUsers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRecords: (params) => dispatch(actions.getRecords(params)),
    savePageInfo: (params) => dispatch(actions.saveRecordPageInfo(params)),
    editRecord: (params) => dispatch(actions.editRecord(params)),
    deleteRecord: (params) => dispatch(actions.deleteRecord(params)),
    getTotalUsers: () => dispatch(actions.getTotalUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminTable);
