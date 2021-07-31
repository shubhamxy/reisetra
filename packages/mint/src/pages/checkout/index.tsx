import { Box, Dialog, makeStyles, Paper } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { MainLayout } from "../../layouts/MainLayout";
import { AppHeader } from "../../ui/Header";
import { Footer } from "../../ui/Footer";
import { ProductsFeed } from "../../ui/Feed/Feed";
import { Checkout } from "../../modules/Checkout";
import { CheckoutSummary } from "../../ui/Checkout/CheckoutSummary";
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
import { useRouter } from "next/router";
import { CheckoutCartList } from "../../ui/Checkout";
import Success from "../../modules/Checkout/Success";
const useStyles = makeStyles((theme) => ({
  content: {
    display: "flex",
    flexDirection: "column",
  },
  left: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  right: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const CheckoutPage = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const authState = useAuthState();
  const globalState = useGlobalState();
  const router = useRouter();
  const { data: response } = useCartItems(
    authState?.user?.cart.id,
    globalState?.promo || null
  );
  const { user, isHydrated } = authState;
  const { cart = {} } = user || {};
  const updateTransaction = useUpdateTransaction();

  useEffect(() => {
    const razorpay = window.document.createElement("script");
    razorpay.async = false;
    razorpay.src = "https://checkout.razorpay.com/v1/checkout.js";
    const body = document.getElementsByTagName("body")[
      document.getElementsByTagName("body").length - 1
    ];
    const child = body.appendChild(razorpay);
    return () => {
      body.removeChild(child);
    };
  }, []);


  function handleTransaction(data) {
    if (!data || !data.razorpayOptions) {
      return;
    }

    function onSuccessHandler(response) {
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
      console.error("handleTransaction.onError", response);
    }

    // eslint-disable-next-line no-undef
    // @ts-ignore
    ref.current = new window.Razorpay({
      handler: onSuccessHandler,
      image: "https://www.reisetra.com/icons/logo.png",
      ...data.razorpayOptions,
    });
    ref.current.on("payment.failed", onError);
    ref.current.open();
  }

  return (
    <MainLayout
      classes={{
        left: classes.left,
        right: classes.right,
      }}
      header={<AppHeader />}
      right={
        <Box style={{ minHeight: "400px" }}>
          <CheckoutSummary data={response?.data || {}} />
          <CheckoutCartList data={response?.data || {}} />
        </Box>
      }
      footer={<Footer />}
    >
      <Paper className={classes.content}>
        <Checkout
          cart={cart}
          promo={globalState.promo}
          data={response?.data || {}}
          handleTransaction={handleTransaction}
        />
        <Dialog
          onClose={() => {
            setOpen(false);
            router.replace("/");
          }}
          aria-labelledby="simple-dialog-title"
          open={open}
          scroll="body"
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
      </Paper>
    </MainLayout>
  );
};

export default CheckoutPage;
