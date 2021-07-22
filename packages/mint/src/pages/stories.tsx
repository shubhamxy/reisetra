import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
  Dialog,
} from "@material-ui/core";
import React from "react";
import { MainLayout } from "../layouts/MainLayout";
import { AppHeader } from "../ui/Header";
import { Footer } from "../ui/Footer";
import HeroCard from "../ui/HeroCard";
import { config } from "../libs";
import { CreateContent } from "../modules/CreateContent";

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

const ErrorPage = () => {
  const classes = useStyles();
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
        <Grid container item xs={12} spacing={2} justify="flex-end">
          <ButtonGroup>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              onClick={handleOpen}
            >
              Add
            </Button>
          </ButtonGroup>
        </Grid>
        <Dialog
          scroll="body"
          fullWidth
          maxWidth="md"
          open={!!open}
          onClose={handleClose}
          className={classes.content}
        >
          {/* @ts-ignore */}
          <CreateContent onCloseHandler={handleClose} />
        </Dialog>

        <Box display="flex" justifyContent="center" alignItems="center">
          Coming Soon
        </Box>
      </Paper>
    </MainLayout>
  );
};

export default ErrorPage;
