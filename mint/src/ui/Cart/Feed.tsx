import React, { useEffect } from "react";
import {
  Paper,
  Box,
  Typography,
  makeStyles,
  CircularProgress,
  Divider,
  Button,
  Grid,
} from "@material-ui/core";
import { List } from "../List/List";
import { Footer } from "../List";
import { useAuthState, useCartCheckout, useCartItems, useProducts } from "../../libs";
import { ProductCard } from "./Card";
import { getTotalCount, getTotalDataCount } from "../../libs/rock/utils/data";
import clsx from "clsx";
import { useRouter } from "next/router";

export const useStyles = makeStyles((theme) => ({
  root: { height: "100%", display: "flex", flexDirection: "column", flex: 1 },
  header: {},
  content: {},
  title: {},
  listRoot: {},
  list: {},
}));

export function Cart({data}) {
  const classes = useStyles();
  const router = useRouter();
  return (
    <Paper className={classes.root}>
      <Grid item xs={12}>
        <Box p={2} className={classes.header}>
          <Typography variant="h6" className={classes.title}>
            Cart
          </Typography>
        </Box>
        <Box overflow="auto" className="scrollbar">
          <List
            classes={{ list: classes.list }}
            ItemSeparatorComponentProps={{
              height: 2,
            }}
            ItemSeparatorComponent={<Divider />}
            data={data.items}
            ListEmptyComponent={
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="320px"
              >
                <Typography align="center" variant="subtitle2">
                  Cart is empty
                </Typography>
              </Box>
            }
            renderItem={({ item, index }) => (
              <ProductCard key={index} data={item} />
            )}
            variant="default"
            ListLoadingComponent={
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                pt={2}
                pb={2}
              >
                <CircularProgress size={24} />
              </Box>
            }
          />
        </Box>
      </Grid>
      <Divider />
      <Grid item xs={12} container>
        <Grid
          item
          xs={12}
          container
          style={{
            paddingLeft: 46,
            paddingRight: 46,
            width: "100%",
          }}
          alignItems="center"
          justify="center"
        >
          <Grid item xs={12} container alignItems="center" justify="center">
            <Grid item xs={12} container>
              <Grid item xs>
                <Typography>Subtotal</Typography>
              </Grid>
              <Grid item>
                <Typography>₹ {String(data.subTotal)}</Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} container>
              <Grid item xs>
                <Typography>Taxes</Typography>
              </Grid>
              <Grid item>
                <Typography>₹ {data.tax}</Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} container>
              <Grid item xs>
                <Typography>Estimated Shipping</Typography>
              </Grid>
              <Grid item>
                <Typography>{data.shipping === 0 ? 'Free' : `₹ ${data.shipping}`}</Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} container>
              <Grid item xs>
                <Typography>Total</Typography>
              </Grid>
              <Grid item>
                <Typography>₹ {data.total}</Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} container>
              <Grid item xs>
                <Typography>Promo</Typography>
              </Grid>
              <Grid item>
                <Typography>{data?.promo?.toUpperCase()} ({data.discount}% off)</Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} container>
              <Grid item xs>
                <Typography>Discount</Typography>
              </Grid>
              <Grid item>
                <Typography> - ₹ {data.itemDiscount}</Typography>
              </Grid>
            </Grid>

            <Grid item xs={12} container>
              <Grid item xs>
                <Typography>Grand Total</Typography>
              </Grid>
              <Grid item>
                <Typography>₹ {data.grandTotal}</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Divider />
          <Grid item xs={12} container alignItems="center" justify="center">
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => {
                router.push("/checkout");
             }}
              fullWidth
            >
              {"Proceed to checkout"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
