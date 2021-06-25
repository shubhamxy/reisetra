import { Box, ButtonGroup, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { MainLayout } from "../../layouts/MainLayout";
import { AppHeader } from "../../ui/Header";
import { Footer } from "../../ui/Footer";
import { CreateProduct } from "../../modules/CreateProduct";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { DataGrid, GridRowData } from "@material-ui/data-grid";
import { useProducts } from "../../libs";
import { Grid } from "@material-ui/core";
import { CreateCategory } from "../../modules/CreateCategory";
import { CreateTag } from "../../modules/CreateTag";
import { CreateOffer } from "../../modules/CreateOffer";
const columns = [
  { field: "id", headerName: "ID", width: 120 },
  { field: "title", headerName: "Title", width: 120},
  { field: "description", headerName: "Description", width: 160},
  { field: "brand", headerName: "Brand", width: 80, },
  { field: "mrp", headerName: "MRP", width: 80 },
  { field: "price", headerName: "Price", width: 80 },
  { field: "tax", headerName: "Tax", width: 80 },
  { field: "createdAt", headerName: "Created At", width: 200, valueFormatter: ({value}) => new Date(value).toLocaleString() },
  { field: "updatedAt", headerName: "Updated At", width: 200, valueFormatter: ({value}) => new Date(value).toLocaleString()},
];

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
  const {
    data,
    isLoading,
    hasNextPage,
    fetchPreviousPage,
    fetchNextPage,
  } = useProducts();
  const [open, setOpen] = React.useState(null);
  const [page, setPage] = useState(0);
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
              Add Category
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="medium"
              onClick={handleClickOpen("tag")}
            >
              Add Tag
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
              color="primary"
              size="medium"
              disabled={selected === null}
              onClick={handleClickOpen("product")}
            >
              Update Product
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              onClick={handleClickOpen("product")}
            >
              Add Product
            </Button>
          </ButtonGroup>
        </Grid>
        <Box flex={1} width={"100%"} mt={2.4}>
          <DataGrid
            onRowSelected={({data}) => {
              setSelected(data);
            }}
            rows={(data?.pages?.[page]?.data || []) as GridRowData[]}
            columns={columns}
            rowCount={data?.pages?.[page]?.meta?.totalCount}
            pageSize={10}
            paginationMode="server"
            page={page}
            onPageChange={(params) => {
              console.log({ params });
              if (params.page === page + 1) {
                fetchNextPage();
              } else if (params.page === page - 1) {
                fetchPreviousPage();
              }
              setPage(params.page);
            }}
            loading={isLoading}
            pagination
            autoHeight
          />
        </Box>
        <Dialog
          scroll="body"
          fullWidth
          maxWidth="md"
          open={!!open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          {
            open === "product" ? (
              <CreateProduct update={selected} isUpdate={selected !== null} />
            ) : open === 'category' ? (
              <CreateCategory />
            ) : open === 'tag' ? (
              <CreateTag />
            ) : open === 'offer' ? (
              <CreateOffer />
            ) : null
          }
        </Dialog>
      </Box>
    </MainLayout>
  );
};

export default ErrorPage;
