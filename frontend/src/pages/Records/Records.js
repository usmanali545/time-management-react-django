import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AddRecord from "./AddRecord";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import AdminTable from "../../components/AdminTable";

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
  { id: "account_user", align: "left", disablePadding: false, label: "User" },
  {
    id: "detail",
    align: "left",
    disablePadding: false,
    label: "Detail",
  },
  { id: "added", align: "left", disablePadding: false, label: "Date Added" },
  { id: "duration", align: "left", disablePadding: false, label: "Duration" },
  { id: "action", align: "center", disablePadding: false, label: "Action" },
];

function Record(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3} justify="center">
        <Grid item xs={10}>
          <Grid container justify="space-between">
            <Grid item xs={6} sm={3} className={classes.settings}>
              <AddRecord />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={10}>
          <AdminTable
            title="All Working Hour Records"
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
  const { loading, records } = state.record;
  return {
    loading,
    records,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRecords: (params) => dispatch(actions.getRecords(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Record);
