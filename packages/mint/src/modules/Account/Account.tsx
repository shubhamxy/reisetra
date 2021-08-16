import { InputAdornment, Paper } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { VerifiedUser } from "@material-ui/icons";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { useUpdateUserProfile, useUserEmailResendVerification } from "../../libs";
import { useAuthState } from "../../libs/rock/auth";
import { useFileUpload } from "../../libs/rock/file";
import { updateSnackBar, useGlobalDispatch } from "../../libs/rock/global";
import { IErrorResponse } from "../../libs/rock/utils/http";
import { Logo } from "../../ui/Logo";
import { Addresses } from "./Addresses";


const AccountSchema = Yup.object().shape({
  name: Yup.string()
    .required("Full name is required.")
    .min(3, "Name is too short - should be 3 chars minimum."),
  email: Yup.string().required("Email is required.").email("Invalid email"),
  phone: Yup.string()
    .matches(new RegExp(/^\+[1-9]\d{8,14}$/), "Phone must be valid")
    .nullable(),
});

const useStyles = makeStyles((theme) => ({
  root: {},
  header: {},
  paper: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    boxShadow: "0 4px 16px rgb(0 0 0 / 15%)",
    alignItems: "center",
    maxWidth: 420,
  },
  footer: {
    display: "flex",
    minHeight: "60px",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
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

export function Account() {
  const classes = useStyles();
  const updateUserProfile = useUpdateUserProfile();
  const emailVerificationResend = useUserEmailResendVerification();
  const authState = useAuthState();
  const globalDispatch = useGlobalDispatch();
  const [selected, setSelected] = useState();
  const initialValues = {
    name: authState.user?.name,
    email: authState.user?.email,
    avatar: authState.user?.avatar,
    emailVerified: authState.user?.emailVerified,
    bio: authState.user?.bio,
    dateOfBirth: authState.user?.dateOfBirth,
    phone: authState.user?.phone,
    oauthId: authState.oauthId,
  };

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
    validateOnMount: true,
    enableReinitialize: true,
    initialValues,
    validationSchema: AccountSchema,
    onSubmit: function (data) {
      updateUserProfile.mutate(data, {
        onSuccess: (response) => {
          globalDispatch(
            updateSnackBar({
              message: "Profile Updated Successfully",
              type: "success",
              open: true,
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
        },
      });
    },
  });

  const avatarUpload = useFileUpload({
    fileType: "images",
    multiple: false,
    onSuccess: (files) => {
      setFieldValue("avatar", files[0].url);
    },
  });
  return (
    <Grid container alignContent="center" justify="center" direction="column">
      <Paper className={classes.paper} component="section">
        <Box className={classes.container}>
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
          <Box className={classes.content}>
            <Typography className={classes.title} variant="h6">
              Account
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
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                {...avatarUpload.getRootProps()}
              >
                <Avatar
                  src={values.avatar}
                  style={{ cursor: "pointer", height: 46, width: 46 }}
                />
                <input {...avatarUpload.getInputProps()} />
              </Box>
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
                disabled
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                autoComplete="pleaseturnoff"
                value={values.email}
                error={touched.email ? !!errors.email : false}
                helperText={touched.email ? errors.email : ""}
                placeholder="e.g. email@address.com"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      {values.emailVerified ? <VerifiedUser titleAccess="Email Verified" style={{ fontSize: 16 }} /> : (
                        <Button
                          size="small"
                          aria-label='Verify email'
                          onClick={() => {
                            emailVerificationResend.mutate();
                          }}
                       >
                          {"Verify"}
                        </Button>
                      )}
                    </InputAdornment>
                  ),
                }}
              />
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="end"
                margin={1}
              >
                <Button  variant="text" href="/account/update-password">
                  <Typography variant="caption">
                    Update Password?
                  </Typography>
                </Button>
              </Box>
              <TextField
                label="Bio"
                size="small"
                variant="outlined"
                margin="normal"
                fullWidth
                name="bio"
                type="text"
                id="bio"
                multiline
                value={values.bio}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.bio ? !!errors.bio : false}
                helperText={touched.bio ? errors.bio : ""}
                placeholder="e.g. waddup!"
              />
              <TextField
                label="Phone"
                size="small"
                variant="outlined"
                margin="normal"
                fullWidth
                name="phone"
                type="text"
                id="phone"
                multiline
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.phone ? !!errors.phone : false}
                helperText={touched.phone ? errors.phone : ""}
                placeholder="e.g. +9198683700"
              />

              <Box mt={2}>
                <TextField
                  id="dateOfBirth"
                  name="dateOfBirth"
                  label="Birthday"
                  type="date"
                  fullWidth
                  value={values.dateOfBirth}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.dateOfBirth ? !!errors.dateOfBirth : false}
                  helperText={touched.dateOfBirth ? errors.dateOfBirth : ""}
                />
              </Box>

              <Addresses
                mt={4.6}
                children={null}
                defaultExpanded={false}
                header
                selected={selected}
                setSelected={setSelected}
              />

              <Box mt={4.6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="medium"
                  color="primary"
                  disabled={!isValid || updateUserProfile.isLoading}
                  className={classes.submit}
                >
                  Update
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
}
