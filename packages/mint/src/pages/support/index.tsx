import React, { useEffect } from "react";
import { MainLayout } from "../../layouts/MainLayout";
import { AppHeader } from "../../ui/Header";
import { Support } from "../../modules/Support";
import { makeStyles, Paper, Typography } from "@material-ui/core";
import { Footer } from "../../ui/Footer";
import { config } from "../../libs";

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

const SupportPage = () => {
  const classes = useStyles();
  const pageMeta = {
    title: "",
    description: "Support",
    url: `${config.clientUrl}/404`,
  };

  return (
    <MainLayout
      classes={{
        left: classes.left,
        right: classes.right,
      }}
      header={<AppHeader />}
      footer={<Footer />}
    >
      <Support />
    </MainLayout>
  );
};

export default SupportPage;
