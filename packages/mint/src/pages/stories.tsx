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
    minHeight: "80vh",
    marginBottom: 48,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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
    title: "Stories",
    description: "",
    url: `${config.clientUrl}/stories`,
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
          // actions={
          //   <Box>
          //     <Button href="/" color="secondary" variant="contained">
          //       Go Back
          //     </Button>
          //   </Box>
          // }
        />
      }
      header={<AppHeader />}
      footer={<Footer />}
    >
      <Paper className={classes.content}>
        <Typography variant="subtitle2">coming soon</Typography>
      </Paper>
    </MainLayout>
  );
};

export default ErrorPage;
