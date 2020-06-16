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
}));

const headCells = [
  {
    id: "first_name",
    align: "left",
    disablePadding: true,
    label: "First Name",
  },
  {
    id: "last_name",
    align: "left",
    disablePadding: true,
    label: "Last Name",
  },
  { id: "email", align: "left", disablePadding: false, label: "Email" },
  { id: "role", align: "left", disablePadding: false, label: "Role" },
  { id: "action", align: "center", disablePadding: false, label: "Action" },
];

function Users(props) {
  const classes = useStyles();
  const { getUsers, users } = props;
  return (
    <div className={classes.root}>
      <Grid container spacing={3} justify="center">
        <Grid item xs={6} sm={3}>
          <AddUser />
        </Grid>
        <Grid item xs={10}>
          <UsersTable
            title="All Users"
            getData={getUsers}
            tableData={users ? users : []}
            totalUsers={users ? users.total_users : 0}
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
