import { makeStyles, Paper } from "@material-ui/core";
import React, { useEffect } from "react";
import { MainLayout } from "../../layouts/MainLayout";
import { Account } from "../../modules/Account";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginBottom: 20,
  },
}));

const AccountPage = () => {
  const classes = useStyles();
  return (
    <MainLayout>
      <Account />
    </MainLayout>
  );
};

export default AccountPage;
