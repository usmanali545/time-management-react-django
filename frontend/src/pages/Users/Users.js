import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AddUser from "./AddUser";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import UsersTable from "../../components/UsersTable";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  recordsTable: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  settings: {
    marginTop: "20px",
  },
}));

const headCells = [
  {
    id: "first_name",
    align: "left",
    disablePadding: false,
    label: "First Name",
  },
  {
    id: "last_name",
    align: "left",
    disablePadding: false,
    label: "Last Name",
  },
  { id: "email", align: "left", disablePadding: false, label: "Email" },
  { id: "role", align: "left", disablePadding: false, label: "Role" },
  { id: "action", align: "center", disablePadding: false, label: "Action" },
];

function Users(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3} justify="center">
        <Grid item xs={10}>
          <Grid container justify="space-between">
            <Grid item xs={6} sm={12} className={classes.settings}>
              <AddUser />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={10}>
          <UsersTable
            title="All Users"
            headCells={headCells}
            actions={{
              exist: true,
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { users } = state.admin;
  return {
    users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: (params) => dispatch(actions.getUsers(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
