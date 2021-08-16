import React from "react";
import { MainLayout } from "../../layouts/MainLayout";
import { Account } from "../../modules/Account";
const AccountPage = () => {
  return (
    <MainLayout
      containerProps={{ style: { justifyContent: "center" } }}
    >
      <Account />
    </MainLayout>
  );
};

export default AccountPage;
