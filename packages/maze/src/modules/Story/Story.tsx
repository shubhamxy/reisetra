import React, { useEffect, useRef, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import TextEditor from '../../ui/TextEditor'
const useStyles = makeStyles((theme) => ({
  root: {
  },
}));

export function Story({ data, isLoading }) {
  const classes = useStyles();
  const {

  } = data || ({} as any);
  const editorRef = useRef(null);
  if(!data) {
    return null;
  }
  return (
    <Grid
      container
      className={classes.root}
      justify="center"
    >
      <Grid item xs={12}>
        <Typography variant="h2">
          {data.title}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextEditor
          readOnly={true}
          ref={editorRef}
          value={data ? data.body : []}
        />
      </Grid>
    </Grid>
  );
}
