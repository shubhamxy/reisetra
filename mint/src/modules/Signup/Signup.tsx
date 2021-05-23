import React from "react";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Image from "next/image";
import {
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Paper,
} from "@material-ui/core";
import { useFormik } from "formik";
import { useUserEmailSignUp } from "../../libs/rock/auth/useAuth";
import { updateSnackBar, useGlobalDispatch } from "../../libs/rock/global";
import { IErrorResponse } from "../../libs/rock/utils/http";
import { login, useAuthDispatch } from "../../libs/rock/auth";

const SignUpSchema = Yup.object().shape({
  tos: Yup.boolean().isTrue("Agreement is required for signup."),
  name: Yup.string()
    .required("Full name is required.")
    .min(3, "Name is too short - should be 3 chars minimum."),
  email: Yup.string().required("Email is required.").email("Invalid email"),
  password: Yup.string()
    .required(
      "Password is required. Password has to be at least 8 characters and less than 64 characters."
    )
    .min(8, "Password is too short - should be 8 chars minimum.")
    .max(64, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});

const useStyles = makeStyles((theme) => ({
  root: {},
  header: {},
  paper: {
    height: "100%",
    width: "100%",
    maxWidth: 400,
    display: "flex",
    flexDirection: "column",
    flex: 1,
    boxShadow: "0 4px 16px rgb(0 0 0 / 15%)",
  },
  footer: {
    display: "flex",
    minHeight: "60px",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    margin: "77px auto 32px",
    textAlign: "center",
    justifyContent: "center",
  },
  links: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 4,
    margin: "24px 0 0 0",
    textAlign: "center",
  },
  link: {
    ...theme.typography.caption,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    width: "100%",
    height: "100%",
    textAlign: "left",
    paddingTop: 24,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: "0",
    width: "100%",
    height: "100%",
    padding: theme.spacing(2.1, 4.0, 4.5, 4.0),
  },
  title: {
    textAlign: "left",
    paddingBottom: 24,
  },
  divider: {
    marginTop: 12,
    marginBottom: 12,
    position: "relative",
    width: "100%",
    textAlign: "center",
    "&:before": {
      background:
        "linear-gradient(to right, #4f44e0 0%, transparent 40%, transparent 60%, #4f44e0 100%)",
      content: "''",
      display: "block",
      height: 1,
      position: "absolute",
      top: 8,
      width: "100%",
    },
  },
  illustration: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  form: {
    width: "100%",
  },
  submit: {
    margin: theme.spacing(1, 0, 1, 0),
  },
  authProviders: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export function SignUp() {
  const classes = useStyles();
  const emailSignup = useUserEmailSignUp();
  const authDispatch = useAuthDispatch();
  const globalDispatch = useGlobalDispatch();
  const {
    values,
    isValid,
    setErrors,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      tos: true,
      name: "",
      email: "",
      password: "",
    },
    validationSchema: SignUpSchema,
    onSubmit: function (data) {
      emailSignup.mutate(
        {
          name: data.name,
          email: data.email,
          password: data.password,
        },
        {
          onSuccess: (response) => {
            globalDispatch(
              updateSnackBar({
                message: "Signed Up Successfully",
                type: "success",
                open: true,
              })
            );

            authDispatch(
              login({
                access_token: response.data.access_token,
                refresh_token: response.data.refresh_token,
              })
            );
          },
          onError: (error: IErrorResponse<any>) => {
            globalDispatch(
              updateSnackBar({
                message: error.errors[0].message,
                type: "error",
                open: true,
              })
            );

            setErrors({
              password: error.errors[0].message,
            });
          },
        }
      );
    },
  });

  const footerLinks = [
    {
      to: "/terms",
      label: "Terms",
    },
    {
      to: "/privacy",
      label: "Privacy",
    },
    {
      to: "/resources",
      label: "Resources",
    },
  ];

  return (
    <Grid container alignContent="center" justify="center" direction="column">
      <Grid
        item
        className={classes.header}
        alignContent="center"
        justify="center"
        direction="column"
      >
        <Box display="flex" className={classes.logo}>
          <Link href={"/"} color="textSecondary" underline={"none"}>
            <Image src="/images/logo.svg" height="30px" width="30px" />
          </Link>
        </Box>
      </Grid>
      <Paper className={classes.paper} component="section">
        <Box className={classes.container}>
          <Box className={classes.content}>
            <Typography className={classes.title} variant="h6">
              Let's get you set up
            </Typography>
            <form
              className={classes.form}
              noValidate
              autoComplete="pleaseturnoff"
              onSubmit={handleSubmit}
            >
              <input
                id="fakeemail"
                style={{ display: "none" }}
                type="text"
                name="fakeusernameremembered"
              />
              <input
                id="fakepassword"
                style={{ display: "none" }}
                type="password"
                name="fakepasswordremembered"
              />
              <TextField
                label="Your name"
                size="small"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                name="name"
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                autoComplete="pleaseturnoff"
                error={touched.name ? !!errors.name : false}
                helperText={touched.name ? errors.name : ""}
                placeholder="First & Last Name"
              />
              <TextField
                label="Email Address"
                size="small"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                name="email"
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                autoComplete="pleaseturnoff"
                value={values.email}
                error={touched.email ? !!errors.email : false}
                helperText={touched.email ? errors.email : ""}
                placeholder="e.g. email@address.com"
              />
              <TextField
                label="Password"
                size="small"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                type="password"
                id="password"
                value={values.password}
                autoComplete="new-password"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password ? !!errors.password : false}
                helperText={touched.password ? errors.password : ""}
                placeholder="e.g. ••••••••"
              />
              <Grid item direction="column" justify="center">
                <Grid
                  item
                  alignItems="center"
                  alignContent="center"
                  justify="center"
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        name="tos"
                        checked={values.tos}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFieldValue("tos", true);
                          } else {
                            setFieldValue("tos", false);
                          }
                        }}
                        color="primary"
                      />
                    }
                    label={
                      <Typography variant="caption">
                        Agreed to terms of use and privacy policy.
                      </Typography>
                    }
                  />
                  <FormHelperText variant="outlined">
                    <Typography variant="caption" color="error">{errors.tos}</Typography>
                  </FormHelperText>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={!isValid || emailSignup.isLoading}
                className={classes.submit}
              >
                Get Started
              </Button>
            </form>
            <Grid container className={classes.authProviders}>
              <Typography
                variant="caption"
                color="textSecondary"
                className={classes.divider}
              >
                Or
              </Typography>
              <Grid item>
                <div id="google-button" />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
      <Grid
        item
        className={classes.footer}
        justify="center"
        alignContent="center"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="caption" align="center">
            Already a user?{" "}
            <Link href="/login" variant="caption" underline={"none"}>
              {"Log In"}
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
