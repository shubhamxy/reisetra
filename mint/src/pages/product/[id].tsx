import {
  makeStyles,
} from "@material-ui/core";
import React from "react";
import { MainLayout } from "../../layouts/MainLayout";
import { AppHeader } from "../../ui/Header";
import { Footer } from "../../ui/Footer";
import { Product } from "../../modules/Product";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { useRouter } from "next/router";
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
  const router = useRouter();
  const {id} = router.query;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log({id}, {q: router.query});
  return (
    <MainLayout
      classes={{
        left: classes.left,
        right: classes.right,
      }}
      header={<AppHeader />}
      footer={<Footer />}
    >
      {/* @ts-ignore */}
      <Product id={id} />
    </MainLayout>
  );
};

export default ErrorPage;
