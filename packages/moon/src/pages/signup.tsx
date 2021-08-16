import React, { useEffect } from "react";
import { MainLayout } from "../layouts/MainLayout";
import { SignUp } from "../modules/Signup";
const SignUpPage = () => {
  return (
    <MainLayout containerProps={{ style: { justifyContent: "center", alignItems: 'center' } }}>
      <SignUp />
    </MainLayout>
  );
};

export default SignUpPage;
