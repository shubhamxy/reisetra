import { Box, ButtonGroup, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { MainLayout } from "../layouts/MainLayout";
import { AppHeader } from "../ui/Header";
import { Footer } from "../ui/Footer";
import { CreateProduct } from "../modules/CreateProduct";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { useAuthState, useDeleteProduct, useProducts } from "../libs";
import { Grid } from "@material-ui/core";
import { CreateCategory } from "../modules/CreateCategory";
import { CreateTag } from "../modules/CreateTag";
import { CreateOffer } from "../modules/CreateOffer";
import { CreateBrand } from "../modules/CreateBrand";

import { useEffect } from "react";
import { useRouter } from "next/router";
import { GridItem } from "../modules/Products";
import GridList from "../ui/List/GridList";

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

const CMSPage = () => {
  const classes = useStyles();
  const router = useRouter();
  useEffect(() => {
    router.replace("/products");
  }, [])


  return (
    <MainLayout
      classes={{
        left: classes.left,
        right: classes.right,
      }}
    >
      <Box display="flex" flexDirection="column">
       </Box>
    </MainLayout>
  );
};

export default CMSPage;
