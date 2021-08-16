import {
  makeStyles,
} from "@material-ui/core";
import React from "react";
import { MainLayout } from "../layouts/MainLayout";
import { config } from "../libs";

const useStyles = makeStyles((theme) => ({
  content: {
    marginBottom: 48,
    display: "flex",
    flexDirection: "column",
  },
  left: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  right: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const ErrorPage = () => {
  const classes = useStyles();
  return (
    <MainLayout
      classes={{
        left: classes.left,
        right: classes.right,
      }}
    />
  );
};

export default ErrorPage;
