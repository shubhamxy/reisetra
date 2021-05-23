import { makeStyles, Paper } from "@material-ui/core";
import React, { useEffect } from "react";
import { MainLayout } from "../../layouts/MainLayout";
import { AppHeader } from "../../ui/Header";
import { SignUp } from "../../modules/Signup";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginBottom: 20,
  },
}));

const SignUpPage = () => {
  const classes = useStyles();
  return (
    <MainLayout>
      <SignUp />
    </MainLayout>
  );
};

export default SignUpPage;
