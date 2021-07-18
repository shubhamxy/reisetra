import { Box, makeStyles, Paper } from "@material-ui/core";
import React, { useEffect } from "react";
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
  const authState = useAuthState();
  const globalState = useGlobalState();
  const router = useRouter();
  const { data: response } = useCartItems(
    authState?.user?.cart.id,
    globalState?.promo || null
  );
  const { user, isHydrated } = authState;
  const { cart = {} } = user || {};
  useEffect(() => {
    if (isHydrated && !cart.id) {
      router.push({
        pathname: "/login",
        query: {
          ref: router.asPath,
        },
      });
      return;
    }
  }, [cart, isHydrated]);
  return (
    <MainLayout
      classes={{
        left: classes.left,
        right: classes.right,
      }}
      header={<AppHeader />}
      right={
        <Box style={{ minHeight: "400px" }}>
          <CheckoutSummary data={response?.data || {}}/>
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
        />
      </Paper>
    </MainLayout>
  );
};

export default CheckoutPage;
