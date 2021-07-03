import { makeStyles, Paper } from "@material-ui/core";
import React, { useEffect } from "react";
import { MainLayout } from "../../layouts/MainLayout";
import { Orders } from "../../modules/Orders";
import { AppHeader } from "../../ui";
const useStyles = makeStyles((theme) => ({
  paper: {
  },
}));

const OrdersPage = () => {
  const classes = useStyles();
  return (
    <MainLayout
      header={<AppHeader />}
    >
      <Orders />
    </MainLayout>
  );
};

export default OrdersPage;
