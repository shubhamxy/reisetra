import {
  Box,
  makeStyles,
  Paper,
} from "@material-ui/core";
import React from "react";
import { MainLayout } from "../layouts/MainLayout";
import { AppHeader } from "../ui/Header";
import { Footer } from "../ui/Footer";
import HeroCard from "../ui/HeroCard";
import { config, useAuthState } from "../libs";

const useStyles = makeStyles((theme) => ({
  content: {
    padding: 24,
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

const StoriesPage = () => {
  const classes = useStyles();
  const authState = useAuthState();
  const pageMeta = {
    title: "Stories",
    description: "",
    url: `${config.clientUrl}/stories`,
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
        <Box display="flex" justifyContent="center" minHeight="100vh" alignItems="center">
          Coming Soon
        </Box>
      </Paper>
    </MainLayout>
  );
};

export default StoriesPage;
