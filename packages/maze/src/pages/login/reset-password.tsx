import React from "react";
import { MainLayout } from "../../layouts/MainLayout";
import { ResetPassword } from "../../modules/Forgot";

const ForgotPasswordPage = () => {
  return (
    <MainLayout>
      <ResetPassword />
    </MainLayout>
  );
};

export default ForgotPasswordPage;
