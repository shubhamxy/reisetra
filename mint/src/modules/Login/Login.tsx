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
import { Paper } from "@material-ui/core";
import { useFormik } from "formik";
import { useUserEmailLogin } from "../../libs/rock/auth/useAuth";
import { updateSnackBar, useGlobalDispatch } from "../../libs/rock/global";
import { IErrorResponse } from "../../libs/rock/utils/http";
import { login, useAuthDispatch } from "../../libs/rock/auth";
import { Icon } from "../../ui/Image";
import { Logo } from "../../ui/Logo";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});

const useStyles = makeStyles((theme) => ({
  root: {
    backdropFilter: "blur(50px)",
  },
  header: {},
  paper: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    flex: 1,
    maxWidth: 364,
    boxShadow: "0 4px 16px rgb(0 0 0 / 15%)",
  },
  footer: {
    minHeight: "60px",
    flexWrap: "wrap",
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
    alignItems: "flex-start",
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
    marginTop: 24,
    marginBottom: 24,
    position: "relative",
    width: "100%",
    textAlign: "center",
    height: 9,
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
  authProviders: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
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
    margin: theme.spacing(1, 0, 2.4, 0),
  },
}));

export function LogIn() {
  const classes = useStyles();
  const emailLogin = useUserEmailLogin();
  const {
    values,
    isValid,
    setErrors,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: function (data) {
      emailLogin.mutate(
        {
          email: data.email,
          password: data.password,
        },
        {
          onError: (error: IErrorResponse<any>) => {
            setErrors({
              password: error.message,
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
            <Logo />
          </Link>
        </Box>
      </Grid>
      <Paper className={classes.paper} component="section">
        <Box className={classes.container}>
          <Box className={classes.content}>
            <Typography className={classes.title} variant="h6">
              Log in to your account
            </Typography>
            <form
              className={classes.form}
              noValidate
              autoComplete="pweeeseturnoff"
              onSubmit={handleSubmit}
            >
              <input
                style={{ display: "none" }}
                type="email"
                name="fakeusernameremembered"
              />
              <input
                style={{ display: "none" }}
                type="password"
                name="fakepasswordremembered"
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
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                error={touched.password ? !!errors.password : false}
                helperText={touched.password ? errors.password : ""}
                placeholder="e.g. ••••••••"
              />
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="flex-end"
                style={{ textAlign: "center" }}
              >
                <Grid item>
                  <Typography variant="caption" align="center">
                    <Link href="/login/forgot" variant="caption" underline={"none"}>
                      Forgot password?
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={emailLogin.isLoading}
                className={classes.submit}
              >
                Login
              </Button>
              <Grid
                container
                direction="column"
                justify="center"
                style={{ textAlign: "center" }}
              >
                <Grid item>
                  <Typography variant="caption" align="center">
                    Don't have an account?{" "}
                    <Link href="/signup" variant="caption" underline={"none"}>
                      {"Sign Up"}
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </form>
            <Grid
              container
              className={classes.authProviders}
            >
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
      <Grid className={classes.footer}>
        <Box className={classes.links}>
          {footerLinks.map((link) => (
            <Link
              key={link.to}
              className={classes.link}
              color="textSecondary"
              href={link.to}
              underline={"none"}
            >
              {link.label}
            </Link>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
}
