import React, { useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {
  updatePromo,
  useAuthState,
  useCartCheckout,
  useCartItems,
  useCreateAddress,
  useGlobalDispatch,
  useGlobalState,
  useUpdateTransaction,
} from "../../libs";
import { Box, Dialog, Grid, TextField } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import * as Yup from "yup";
import { useFormik } from "formik";
import Success from "./Success";
import { useRouter } from "next/router";
import { Addresses } from "../Account/Addresses";
import { useEffect } from "react";
import { useQueryClient } from "react-query";

const addressSchema = Yup.object().shape({
  address: Yup.string().min(4).required("Address is required"),
  billingAddress: Yup.string(),
  isSameBillingAddress: Yup.boolean(),
  promo: Yup.string(),
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
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export function Checkout() {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const updateTransaction = useUpdateTransaction();
  const queryClient = useQueryClient();
  const cartCheckout = useCartCheckout();
  const ref = useRef(null);
  const authState = useAuthState();
  const globalState = useGlobalState();
  const { data: response } = useCartItems(
    authState?.user?.cart.id,
    globalState?.promo || null
  );
  const dispatch = useGlobalDispatch();
  const { user } = authState;
  const { cart = {} } = user || {};
  const router = useRouter();
  useEffect(() => {
    const razorpay = window.document.createElement("script");
    razorpay.async = false;
    razorpay.src = "https://checkout.razorpay.com/v1/checkout.js";
    const body = document.getElementsByTagName("body")[
      document.getElementsByTagName("body").length - 1
    ];
    body.appendChild(razorpay);
  }, []);
  const initialValues = {
    address: "",
    billingAddress: "",
    isBillingAddressSame: true,
    promo: globalState.promo || "",
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
      cartCheckout.mutate(
        {
          cartId: cart.id,
          addressId: data["address"],
          promo: globalState.promo,
        },
        {
          onSuccess: ({ data }) => {
            console.log({ data });
            handleTransaction(data);
          },
        }
      );
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
        <Grid container item xs={12}>
          <Grid item xs={12}>
            <Addresses
              title="Shipping Address"
              header={true}
              selected={values.address}
              setSelected={(value) => {
                setFieldValue("address", value);
              }}
              children={
                <>
                <Grid container item xs={12}>
                  <Grid item xs={12} style={{ padding: 16 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="primary"
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
                {!values.isBillingAddressSame && (
                  <Grid item xs={12}>
                    <Addresses
                      children={null}
                      title="Billing Address"
                      header={false}
                      selected={values.billingAddress}
                      setSelected={(value) => {
                        setFieldValue("billingAddress", value);
                      }}
                    />
                  </Grid>
                )}
                </>
              }
            />
          </Grid>
        </Grid>
        <Grid container style={{marginTop: 24}} item xs={12} direction="row" spacing={2} alignItems="center" alignContent="center">
          <Grid item>
            <TextField
              id="promo"
              name="promo"
              label="Promo"
              type="text"
              value={values.promo}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.promo ? !!errors.promo : false}
              helperText={touched.promo ? errors.promo : ""}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              onClick={(e) => {
                dispatch(updatePromo(values.promo));
              }}
            >
              Apply
            </Button>
            <Box display="flex" alignItems="center" justifyContent="center" pl={1.6} pr={1.6}>
              <Typography variant="caption">
                {response?.['data']?.['promo'] ? `${response?.['data']?.['promo']} applied` : ''}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid container item xs={12}>
        <Grid item xs>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={(e) => {
              handleSubmit();
            }}
            disabled={!isValid}
            className={classes.button}
          >
            Place order
          </Button>
        </Grid>
      </Grid>
      <Dialog
        onClose={() => {
          router.replace("/");
          setOpen(false);
        }}
        aria-labelledby="simple-dialog-title"
        open={open}
        fullWidth
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
