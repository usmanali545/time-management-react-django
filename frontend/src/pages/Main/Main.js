import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AddRecord from "./AddRecord";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import OwnRecordTable from "../../components/OwnRecordTable";

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
    id: "detail",
    align: "left",
    disablePadding: true,
    label: "Detail",
  },
  { id: "added", align: "left", disablePadding: false, label: "Date Added" },
  { id: "duration", align: "right", disablePadding: false, label: "Duration" },
  { id: "action", align: "center", disablePadding: false, label: "Action" },
];

function Main(props) {
  const classes = useStyles();
  const { getOwnRecords, records } = props;
  return (
    <div className={classes.root}>
      <Grid container spacing={3} justify="center">
        <Grid item xs={6} sm={3}>
          <AddRecord />
        </Grid>
        <Grid item xs={10}>
          <OwnRecordTable
            title="Working Hour Records"
            getData={getOwnRecords}
            tableData={records ? records : []}
            totalRecords={records ? records.total_records : 0}
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
    getOwnRecords: (params) => dispatch(actions.getOwnRecords(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
