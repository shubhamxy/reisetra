import React, { useEffect } from "react";
import { MainLayout } from "../../layouts/MainLayout";
import { LogIn } from "../../modules/Login";
const LoginPage = () => {
  return (
    <MainLayout>
      <LogIn />
    </MainLayout>
  );
};

export default LoginPage;
