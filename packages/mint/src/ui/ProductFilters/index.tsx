import {
  Avatar,
  Box,
  Chip,
  createStyles,
  Divider,
  fade,
  List,
  ListItem,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import * as React from "react";
import { FilterT } from "../../pages/products";
import { Filters } from "./Item";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      background: `linear-gradient(to right, ${theme.colors.golden.dark}, ${theme.colors.golden.light})`,
      margin: 0,
    },
  })
);

export function ProductFilters({
  data,
  values,
  setFieldValue,
}: {
  data: {
    [key: string]: FilterT;
  };
  values: {
    [key: string]: string | string[] | number[];
  };
  setFieldValue: (key: string, value: string | string[] | number[]) => void;
}) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      {/* @ts-ignore */}
      <Filters data={data} values={values} setFieldValue={setFieldValue} />
    </Paper>
  );
}
