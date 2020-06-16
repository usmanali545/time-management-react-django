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
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import FilterListIcon from "@material-ui/icons/FilterList";
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
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Alert from "@material-ui/lab/Alert";
import { validateEmail } from "../utils/helpers/validation";

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

      <Tooltip title="Filter list">
        <IconButton aria-label="filter list">
          <FilterListIcon />
        </IconButton>
      </Tooltip>
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
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  modalPaper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "50%",
  },
}));

function AdminTable(props) {
  const {
    me,
    getData,
    tableData,
    totalPage,
    headCells,
    actions,
    saveUsersPageInfo,
    editUser,
  } = props;
  const classes = useStyles();
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("created");
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const hasAdminAccess = me.role === "admin";

  // Edit Modal
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [errorLog, setErrorLog] = useState(null);
  const [role, setRole] = React.useState("");
  const [editUserId, setEditUserId] = useState(null);
  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const { email } = data;
    let valid;
    if (email === "") {
      valid = { valid: true, reason: "Success" };
    } else {
      valid = validateEmail(email);
    }
    if (valid.valid) {
      setError(false);
      const { first_name, last_name, email, password } = data;
      data = {
        first_name: first_name !== "" ? first_name : undefined,
        last_name: last_name !== "" ? last_name : undefined,
        email: email !== "" ? email : undefined,
        password: password !== "" ? password : undefined,
      };
      editUser({ id: editUserId, role, ...data });
      handleClose();
    } else {
      setError(true);
      setErrorLog(valid.reason);
    }
  };

  useEffect(() => {
    saveUsersPageInfo({ order, orderBy, page, rowsPerPage });
    getData({ order, orderBy, page, rowsPerPage });
  }, [order, orderBy, page, rowsPerPage, saveUsersPageInfo, getData]);

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

  const handleEdit = (row) => {
    setOpen(true);
    setEditFirstName(row.first_name);
    setEditLastName(row.last_name);
    setEditUserId(row.id);
    setEditEmail(row.email);
    setRole(row.role);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleClose = () => {
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
    const { deleteUser } = props;
    deleteUser({ id: selectedRow.id });
    handleDeleteClose();
  };
  // const emptyRows =
  //   rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

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
              {/* {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) */}
              {tableData.data.map((row, index) => {
                const labelId = `admin-table-checkbox-${index}`;

                return (
                  <TableRow hover tabIndex={-1} key={index}>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.first_name}
                    </TableCell>
                    <TableCell align="left">{row.last_name}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.role}</TableCell>
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
              {/* {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalPage}
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
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    autoComplete="fname"
                    name="first_name"
                    variant="outlined"
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    inputRef={register}
                    defaultValue={editFirstName}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="last_name"
                    autoComplete="lname"
                    inputRef={register}
                    defaultValue={editLastName}
                  />
                </Grid>
                <Grid xs={12} sm={4}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="select-label">Role</InputLabel>
                    <Select
                      labelId="select-label"
                      id="demo-simple-select"
                      value={role}
                      required
                      name="role"
                      onChange={handleRoleChange}
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
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    inputRef={register}
                    error={error}
                    helperText={error && errorLog}
                    defaultValue={editEmail}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
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
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Edit User
              </Button>
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
        <DialogTitle id="alert-dialog-title">{"Delete User"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">
            No
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
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
    saveUsersPageInfo: (params) => dispatch(actions.saveUsersPageInfo(params)),
    editUser: (params) => dispatch(actions.editUser(params)),
    deleteUser: (params) => dispatch(actions.deleteUser(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminTable);
