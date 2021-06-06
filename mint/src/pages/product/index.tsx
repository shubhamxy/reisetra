import {
  Box,
  makeStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import { MainLayout } from "../../layouts/MainLayout";
import { AppHeader } from "../../ui/Header";
import { Footer } from "../../ui/Footer";
import { CreateProduct } from "../../modules/CreateProduct";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { DataGrid} from '@material-ui/data-grid';
import { useProducts } from "../../libs";
const columns = [
  { field: 'id', headerName: 'ID', width: 80 },
  { field: 'title', headerName: 'Title', width: 130 },
  { field: 'description', headerName: 'Description', width: 130 },
  { field: 'brand', headerName: 'Brand', width: 130 },
  { field: 'mrp', headerName: 'MRP', width: 130 },
  { field: 'price', headerName: 'Price', width: 130 },
  { field: 'tax', headerName: 'Tax', width: 130 },
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
  const {data, isLoading, hasNextPage,fetchPreviousPage,  fetchNextPage} = useProducts();
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = useState(0);
  const handleClickOpen = () => {
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
      header={<AppHeader />}
      footer={<Footer />}
    >
      <Box display="flex" flexDirection="column">
      <Box display="flex" flexDirection="column" alignItems="flex-end">
        <Button variant="outlined" color="primary" size="large" onClick={handleClickOpen}>
          Add Product
        </Button>
      </Box>
      <Box flex={1}  width={"100%"} mt={2.4}>
        {/* @ts-ignore */}
        <DataGrid rows={data?.pages?.[page]?.data || []} columns={columns}
          rowCount={data?.pages?.[page]?.meta?.totalCount}
          pageSize={10}
          paginationMode="server"
          page={page}
          onPageChange={(params) => {
            console.log({params});
            if(params.page === page + 1) {
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
      <Dialog scroll="body" fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
         <CreateProduct />
      </Dialog>
      </Box>
    </MainLayout>
  );
};

export default ErrorPage;
