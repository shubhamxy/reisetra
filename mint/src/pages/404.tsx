import {
  Box,
  Button,
  Container,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React from "react";
import { MainLayout } from "../layouts/MainLayout";
import { AppHeader } from "../ui/Header";
import { Footer } from "../ui/Footer";
import HeroCard from "../ui/HeroCard";
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
  const pageMeta = {
    title: "404",
    description: "Oops! You found a missing page!",
    url: `${config.clientUrl}/404`,
  };

  return (
    <MainLayout
      classes={{
        left: classes.left,
        right: classes.right,
      }}
      top={
        <HeroCard
          data={{
            title: pageMeta.title,
            subtitle: pageMeta.description,
            backgroundImage: "",
          }}
          actions={
            <Box pt={2.4}>
              <Button href="/" color="primary" variant="contained">
                Go Back
              </Button>
            </Box>
          }
        />
      }
      header={<AppHeader />}
      footer={<Footer />}
    />
  );
};

export default ErrorPage;
