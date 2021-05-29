import React, { useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {
  useAuthState,
  useCartCheckout,
  useCreateAddress,
  useUpdateTransaction,
} from "../../libs";
import { Dialog, Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import * as Yup from "yup";
import { useFormik } from "formik";
import Success from "./Success";
import { useRouter } from "next/router";

const addressSchema = Yup.object().shape({
  fullname: Yup.string().required("Fullname is required"),
  address: Yup.string().min(4).required("Address is required"),
  region: Yup.string(),
  nearby: Yup.string(),
  zipcode: Yup.string().required("Zipcode is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  country: Yup.string().required("Country is required"),
  email: Yup.string().email().required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  isSameBillingAddress: Yup.boolean(),
});

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    padding: theme.spacing(6, 4.6, 6, 4.6),
    height: "100%",
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export function Checkout() {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const createAddress = useCreateAddress();
  const updateTransaction = useUpdateTransaction();
  const cartCheckout = useCartCheckout();
  const ref = useRef(null);
  const authState = useAuthState();
  const { user } = authState;
  const { cart = {} } = user || {};
  const router = useRouter();
  const initialValues = {
    fullname: "Shubham Jain",
    address: "A-1 116, Sector 6, Rohini",
    region: "North West Delhi",
    nearby: "M2K",
    zipcode: "110085",
    city: "New Delhi",
    state: "New Delhi",
    country: "India",
    email: user?.email || "",
    phone: user?.phone || "",
    isBillingAddressSame: true,
  };

  const {
    values,
    setFieldValue,
    isValid,
    touched,
    errors,
    handleChange,
    handleSubmit,
    validateForm,
    setTouched,
    handleBlur,
    resetForm,
  } = useFormik({
    initialValues,
    validateOnMount: true,
    enableReinitialize: true,
    validationSchema: addressSchema,
    onSubmit: (data) => {
      const { isBillingAddressSame, ...rest } = data;
      createAddress.mutate(rest, {
        onSuccess: ({ data }) => {
          cartCheckout.mutate(
            {
              cartId: cart.id,
              addressId: data["id"],
            },
            {
              onSuccess: ({ data }) => {
                console.log({ data });
                handleTransaction(data);
              },
            }
          );
        },
        onError: () => {},
      });
    },
  });

  function handleTransaction(data) {
    if (!data || !data.razorpayOptions) {
      return;
    }

    function onSuccess(response) {
      updateTransaction.mutate(
        {
          id: data.id,
          body: {
            paymentOrderId: response.razorpay_order_id,
            paymentSignature: response.razorpay_signature,
            paymentId: response.razorpay_payment_id,
          },
        },
        {
          onSuccess: ({ data }) => {
            setOpen(true);
          },
        }
      );
    }

    function onError(response) {
      console.log({ response });
    }

    // eslint-disable-next-line no-undef
    // @ts-ignore
    ref.current = new window.Razorpay({
      handler: onSuccess,
      ...data.razorpayOptions,
    });
    ref.current.on("payment.failed", onError);
    ref.current.open();
  }

  return (
    <Grid container className={classes.layout}>
      <Grid container item xs={12}>
        <Grid item xs={12} style={{ paddingBottom: 46 }}>
          <Typography variant="h6" gutterBottom>
            Shipping Information
          </Typography>
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="fullname"
              name="fullname"
              label="Full Name"
              placeholder="Eg. Ram Das"
              fullWidth
              autoComplete="name"
              value={values.fullname}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.fullname ? !!errors.fullname : false}
              helperText={touched.fullname ? errors.fullname : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address"
              name="address"
              label="Address"
              fullWidth
              multiline
              placeholder="Eg. 45, 5th Floor, Industry House, Race Course Road"
              autoComplete="shipping"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.address ? !!errors.address : false}
              helperText={touched.address ? errors.address : ""}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              id="region"
              name="region"
              label="Region"
              fullWidth
              autoComplete="region"
              value={values.region}
              placeholder="Eg. Rajgarh"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.region ? !!errors.region : false}
              helperText={touched.region ? errors.region : ""}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              placeholder="Eg. Bangalore"
              autoComplete="shipping city"
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.city ? !!errors.city : false}
              helperText={touched.city ? errors.city : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="state"
              name="state"
              label="State / Province / Town"
              placeholder="Eg. Karnataka"
              fullWidth
              value={values.state}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.state ? !!errors.state : false}
              helperText={touched.state ? errors.state : ""}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              required
              id="zipcode"
              name="zipcode"
              label="Zip / Postal code"
              fullWidth
              placeholder="560001"
              autoComplete="shipping postal-code"
              value={values.zipcode}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.zipcode ? !!errors.zipcode : false}
              helperText={touched.zipcode ? errors.zipcode : ""}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              id="nearby"
              name="nearby"
              label="Nearby"
              fullWidth
              value={values.nearby}
              onChange={handleChange}
              placeholder="Eg. mgm mall"
              onBlur={handleBlur}
              error={touched.nearby ? !!errors.nearby : false}
              helperText={touched.nearby ? errors.nearby : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              placeholder="Eg. India"
              autoComplete="shipping country"
              value={values.country}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.country ? !!errors.country : false}
              helperText={touched.country ? errors.country : ""}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="email"
              name="email"
              label="Email Address"
              placeholder="Eg. john@example.com"
              fullWidth
              autoComplete="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email ? !!errors.email : false}
              helperText={touched.email ? errors.email : ""}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="phone"
              name="phone"
              label="Phone"
              placeholder="Eg. +918022250763"
              fullWidth
              autoComplete="phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.phone ? !!errors.phone : false}
              helperText={touched.phone ? errors.phone : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
                  name="isBillingAddressSame"
                  checked={values.isBillingAddressSame}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFieldValue("isBillingAddressSame", true);
                    } else {
                      setFieldValue("isBillingAddressSame", false);
                    }
                  }}
                />
              }
              label="Billing address is same as shipping"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid className={classes.buttons}>
        <Button
          variant="contained"
          size="large"
          color="secondary"
          onClick={(e) => {
            handleSubmit();
          }}
          className={classes.button}
        >
          Place order
        </Button>
      </Grid>

      <Dialog
        onClose={() => {
          router.replace("/");
          setOpen(false);
        }}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <Success
          handleNext={() => {
            router.replace("/");
          }}
          onCloseHandler={() => {
            router.replace("/");
          }}
        />
      </Dialog>
    </Grid>
  );
}
