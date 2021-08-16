import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {
  updatePromo,
  updateSnackBar,
  useCartCheckout,
  useGlobalDispatch,
} from "../../libs";
import { Box, Grid, TextField } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Addresses } from "../Account/Addresses";

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

export function Checkout({ cart, promo, data, handleTransaction }) {
  const classes = useStyles();
  const cartCheckout = useCartCheckout();
  const dispatch = useGlobalDispatch();
  const initialValues = {
    address: "",
    billingAddress: "",
    isBillingAddressSame: true,
    promo: promo || "",
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
          promo: promo,
        },
        {
          onSuccess: ({ data }) => {
            handleTransaction(data);
          },
        }
      );
    },
  });
  return (
    <Grid container className={classes.layout}>
      <Grid container item xs={12}>
        <Grid item xs={12} style={{ paddingBottom: 12 }}>
          <Typography variant="h6">Shipping</Typography>
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
              defaultExpanded
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
        <Grid
          container
          style={{ marginTop: 24 }}
          item
          xs={12}
          direction="row"
          spacing={2}
          alignItems="center"
          alignContent="center"
        >
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
          <Grid item container direction="row" xs>
            <Button
              variant="contained"
              size="medium"
              color="secondary"
              onClick={(e) => {
                dispatch(updatePromo(values.promo));
              }}
            >
              Apply
            </Button>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              pl={1.6}
            >
              <Typography variant="caption">
                {data?.["promo"] ? `${data["promo"]} applied!` : ""}
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
              if (!isValid) {
                dispatch(
                  updateSnackBar({
                    message: "Please select an address to continue.",
                    type: "error",
                    open: true,
                  })
                );
                return;
              }
              handleSubmit();
            }}
            className={classes.button}
          >
            Place order
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
