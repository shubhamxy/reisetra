import { makeStyles, Paper } from "@material-ui/core";
import React, { useEffect } from "react";
import { MainLayout } from "../../layouts/MainLayout";
import { Orders } from "../../modules/Orders";
import { AppHeader, Footer } from "../../ui";
const useStyles = makeStyles((theme) => ({
  paper: {
  },
}));

const OrdersPage = () => {
  const classes = useStyles();
  return (
    <MainLayout
      header={<AppHeader />}
      footer={<Footer />}
    >
      <Orders />
    </MainLayout>
  );
};

export default OrdersPage;
