import { Box, makeStyles, Paper } from "@material-ui/core";
import React from "react";
import { MainLayout } from "../../layouts/MainLayout";
import { AppHeader } from "../../ui/Header";
import { Footer } from "../../ui/Footer";
import RecommendedCategories from "../../ui/RecommendedCategories";
import Catelogs from "../../modules/Catelog";
import HeroCard from "../../ui/HeroCard";
import { SectionCard } from "../../ui/SectionCard";
import { ShowCase } from "../../modules/ShowCase";
import { ProductsFeed } from "../../ui/Feed/Feed";
import { Products } from "../../modules/Products";
import { Categories } from "../../modules/Categories";
import { Checkout } from "../../modules/Checkout";
import { CheckoutSummary } from "../../ui/CheckoutSummary";

const useStyles = makeStyles((theme) => ({
  content: {
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
      header={<AppHeader />}
      right={
        <Box style={{ minHeight: "400px" }}>
          <CheckoutSummary />
          <ProductsFeed />
        </Box>
      }
      footer={<Footer />}
    >
      <Paper className={classes.content}>
        <Checkout />
      </Paper>
    </MainLayout>
  );
};

export default IndexPage;
