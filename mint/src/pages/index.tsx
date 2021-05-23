import {
  Box,
  makeStyles,
  Paper,
} from "@material-ui/core";
import React from "react";
import { MainLayout } from "../layouts/MainLayout";
import { AppHeader } from "../ui/Header";
import { Footer } from "../ui/Footer";
import RecommendedCategories from "../ui/RecommendedCategories";
import Feed from "../ui/Feed";
import Catelogs from "../modules/Catelogs";
import HeroCard from "../ui/HeroCard";
import SectionCard from "../ui/SectionCard";
import ShowCase from "../modules/Showcase";
import { Image } from "../ui/Image";

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

const IndexPage = () => {
  const classes = useStyles();
  return (
    <MainLayout
      classes={{
        left: classes.left,
        right: classes.right,
      }}
      top={
        <HeroCard
          data={{
            title: 'Indian Handcrafts',
            subtitle: 'Unique products designed by independent artists.',
            backgroundImage: '',
          }}
        />
      }
      header={<AppHeader />}
      right={
        <Box style={{ minHeight: "400px" }}>
          <RecommendedCategories />
        </Box>
      }
      footer={<Footer />}
    >
      <>
        <Paper className={classes.content}>
          <Box style={{ marginBottom: 48 }}>
            <Catelogs />
          </Box>
          <Box pl={2.4} pr={2.4}>
            <SectionCard />
          </Box>
          <Box className={classes.content} style={{ marginTop: 48 }}>
            <ShowCase />
          </Box>
        </Paper>
      </>
    </MainLayout>
  );
};

export default IndexPage;
