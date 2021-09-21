import React, { useEffect, useRef, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import TextEditor from '../../ui/TextEditor'
import HeroCard from "../../ui/HeroCard";
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
      <HeroCard
        data={{
          title: data.title,
          subtitle: data.subtitle,
          backgroundImage: '',
        }}
      />
      <Grid item xs={12} style={{marginTop: 64}}>
        <TextEditor
          // @ts-ignore
          readOnly={true}
          ref={editorRef}
          value={data ? data.body : []}
        />
      </Grid>
    </Grid>
  );
}
