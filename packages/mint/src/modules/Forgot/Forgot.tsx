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
import { useUserEmailForgotPassword } from "../../libs/rock/auth/useAuth";
import { updateSnackBar, useGlobalDispatch } from "../../libs/rock/global";
import { IErrorResponse } from "../../libs/rock/utils/http";
import { login, useAuthDispatch } from "../../libs/rock/auth";
import { useRouter } from "next/router";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

const useStyles = makeStyles((theme) => ({
  root: {},
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
    padding: theme.spacing(1, 0, 2.4, 0),
  },
  submit: {
    margin: theme.spacing(2.4, 0, 2.4, 0),
  },
}));

export function ForgotPassword() {
  const classes = useStyles();
  const emailForgotPassword = useUserEmailForgotPassword();
  const {replace} = useRouter();
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
  } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: LoginSchema,
    onSubmit: function (data) {
      emailForgotPassword.mutate(data.email,
        {
          onSuccess: (response) => {
            globalDispatch(
              updateSnackBar({
                message: "Email Sent Successfully",
                type: "success",
                open: true,
              })
            );
            replace('/login')
          },
          onError: (error: IErrorResponse<any>) => {
            globalDispatch(
              updateSnackBar({
                message: error.message,
                type: "error",
                open: true,
                duration: 10000
              })
            );
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
        // alignContent="center"
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
              Forgot password?
            </Typography>
            <Typography className={classes.title} variant="caption">
              Don’t worry! Fill in your email and we’ll send you a link to reset
              your password.
            </Typography>
            <form
              className={classes.form}
              noValidate
              autoComplete="pweeeseturnoff"
              onSubmit={handleSubmit}
            >
              <input
                id="email"
                style={{ display: "none" }}
                type="email"
                name="fakeusernameremembered"
              />
              <input
                id="password"
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={emailForgotPassword.isLoading}
                className={classes.submit}
              >
                Send Email
              </Button>
              <Grid
                container
                direction="column"
                justify="center"
                style={{ textAlign: "center" }}
              >
                <Grid item>
                  <Typography variant="caption" align="center">
                    <Link href="/login" variant="caption" underline={"none"}>
                      {"Back to Login"}
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </form>
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
