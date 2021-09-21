import { Box, ButtonGroup, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { MainLayout } from "../layouts/MainLayout";
import { AppHeader } from "../ui/Header";
import { Footer } from "../ui/Footer";
import { CreateProduct } from "../modules/CreateProduct";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { config, useAuthState, useDeleteProduct, useProducts } from "../libs";
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
  const deleteProduct = useDeleteProduct();
  const authState = useAuthState();
  const {} = authState;
  const router = useRouter();
  const query = useProducts(router.query, true);
  useEffect(() => {
    if (
      authState.isHydrated === true &&
      (authState.isAuthenticated === false ||
        (authState.user && authState.user.role !== "ADMIN"))
    ) {
      router.push("/login");
    }
  }, [authState]);
  const [open, setOpen] = React.useState(null);
  const [selected, setSelected] = useState(null);
  const handleClickOpen = (key) => () => {
    setOpen(key);
  };

  const handleClose = () => {
    setOpen(null);
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
      <Box display="flex" flexDirection="column">
        <Grid container item xs={12} spacing={2} justify="flex-end">
          <ButtonGroup>
            <Button
              variant="contained"
              color="secondary"
              size="medium"
              onClick={handleClickOpen("category")}
            >
              Category
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="medium"
              onClick={handleClickOpen("tag")}
            >
              Tag
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="medium"
              onClick={handleClickOpen("offer")}
            >
              Offer
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="medium"
              onClick={handleClickOpen("brand")}
            >
              Brand
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="medium"
              onClick={handleClickOpen("product")}
            >
              Product
            </Button>
          </ButtonGroup>
        </Grid>
        <GridList
          query={query}
          renderItem={({ item, index }) => (
            <GridItem
              {...item}
              showDescription
              onClick={() => {
                window.open(`${config.clientUrl}/product/${item.id}`);
              }}
              key={item.id}
              styleIndex={index}
              handleDelete={(id) => {
                deleteProduct.mutate(id);
              }}
              handleEdit={(id) => {
                setSelected(id);
                handleClickOpen("product")();
              }}
            />
          )}
        />
        <Dialog
          scroll="body"
          fullWidth
          maxWidth="md"
          open={!!open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          {open === "product" ? (
            <CreateProduct selected={selected} isUpdate={selected !== null} />
          ) : open === "category" ? (
            <CreateCategory />
          ) : open === "tag" ? (
            <CreateTag />
          ) : open === "offer" ? (
            <CreateOffer />
          ) : open === "brand" ? (
            <CreateBrand />
          ) : null}
        </Dialog>
      </Box>
    </MainLayout>
  );
};

export default CMSPage;
