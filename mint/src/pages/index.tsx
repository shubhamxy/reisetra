import { Box, makeStyles, Paper } from "@material-ui/core";
import React from "react";
import { MainLayout } from "../layouts/MainLayout";
import { AppHeader } from "../ui/Header";
import { Footer } from "../ui/Footer";
import RecommendedCategories from "../ui/RecommendedCategories";
import Catelogs from "../modules/Catelog";
import HeroCard from "../ui/HeroCard";
import { SectionCard } from "../ui/SectionCard";
import { ShowCase } from "../modules/ShowCase";
import { ProductsFeed } from "../ui/Feed/Feed";
import { Products } from "../modules/Products";
import { Categories } from "../modules/Categories";

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
            title: "Indian Handcrafts",
            subtitle: "Unique products designed by independent artists.",
            backgroundImage: "",
          }}
        />
      }
      header={<AppHeader />}
      right={
        <Box style={{ minHeight: "400px" }}>
          <RecommendedCategories />
          <ProductsFeed />
        </Box>
      }
      footer={<Footer />}
    >
      <Paper className={classes.content}>
        <Box className={classes.content}>
          <ShowCase />
        </Box>

        <Box pl={2.4} pr={2.4} pt={2.4} pb={2.4}>
          <SectionCard />
        </Box>
        <Box className={classes.content}>
          <Products />
        </Box>

        <Box className={classes.content}>
          <Categories />
        </Box>
        <Box>
          <Catelogs />
        </Box>
      </Paper>
    </MainLayout>
  );
};

export default IndexPage;
