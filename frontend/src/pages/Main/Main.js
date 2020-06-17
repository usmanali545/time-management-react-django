import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import AddRecord from "./AddRecord";
import SetWorkingHour from "./SetWorkingHour";
import OwnRecordTable from "../../components/OwnRecordTable";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  AddRecord: {
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  settings: {
    marginTop: "20px",
  },
  button: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: "white",
  },
  header: {
    paddingRight: "0px !important",
  },
}));

const headCells = [
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

function Main(props) {
  const classes = useStyles();
  const { exportRecords, ownRecordPageInfo } = props;

  const handleExport = () => {
    const { from, to } = ownRecordPageInfo;
    exportRecords({ from, to });
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3} justify="center">
        <Grid className={classes.settings} item xs={6} sm={1}></Grid>
        <Grid className={classes.settings} item xs={6} sm={8}>
          <AddRecord className={classes.AddRecord} />
        </Grid>
        <Grid className={classes.settings} item xs={6} sm={2}>
          <SetWorkingHour />
        </Grid>
        <Grid className={classes.settings} item xs={6} sm={1}>
          <Button
            variant="contained"
            className={classes.button}
            color="primary"
            onClick={handleExport}
          >
            Export
          </Button>
        </Grid>
        <Grid item xs={10}>
          <OwnRecordTable
            title="My Records"
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
  const { loading, ownRecordPageInfo } = state.record;
  return {
    loading,
    ownRecordPageInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    exportRecords: (params) => dispatch(actions.exportOwnRecords(params)),
    getOwnRecords: (params) => dispatch(actions.getOwnRecords(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
