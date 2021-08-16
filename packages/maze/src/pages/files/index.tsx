import React from "react";
import { MainLayout } from "../../layouts/MainLayout";
import { Files } from "../../modules/Files";
import { AppHeader, Footer } from "../../ui";

const OrdersPage = () => {
  return (
    <MainLayout header={<AppHeader />} footer={<Footer />}>
      <Files />
    </MainLayout>
  );
};

export default OrdersPage;
