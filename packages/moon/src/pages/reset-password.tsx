import React from "react";
import { MainLayout } from "../layouts/MainLayout";
import { ResetPassword } from "../modules/Forgot";

const ForgotPasswordPage = () => {
  return (
    <MainLayout containerProps={{ style: { justifyContent: "center" } }}>
      <ResetPassword />
    </MainLayout>
  );
};

export default ForgotPasswordPage;
