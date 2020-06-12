import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AddRecord from "./AddRecord";

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

export default function Main() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={3}>
          <AddRecord />
        </Grid>
        <Grid item xs={12}>
          <div className={classes.recordsTable}>Record table</div>
        </Grid>
      </Grid>
    </div>
  );
}
