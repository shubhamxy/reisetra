import React from "react";
import { MainLayout } from "../../layouts/MainLayout";
import { UpdatePassword } from "../../modules/Update";

const UpdatePasswordPage = () => {
  return (
    <MainLayout containerProps={{ style: { justifyContent: "center" } }}>
      <UpdatePassword />
    </MainLayout>
  );
};

export default UpdatePasswordPage;
