import React, { useEffect, useState } from "react";
import {
  Paper,
  Box,
  Typography,
  makeStyles,
  CircularProgress,
  Divider,
  Button,
  Grid,
  TextField,
  fade,
  IconButton,
} from "@material-ui/core";
import { List } from "../List/List";
import { Footer } from "../List";
import {
  updatePromo,
  useAuthState,
  useCartCheckout,
  useCartItems,
  useGlobalDispatch,
  useGlobalState,
  useProducts,
} from "../../libs";
import { ProductCard } from "./Card";
import { getTotalCount, getTotalDataCount } from "../../libs/rock/utils/data";
import clsx from "clsx";
import { useRouter } from "next/router";
import Close from "@material-ui/icons/Close";

export const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
  },
  header: {
    backgroundColor: theme.palette.background.paper,
    padding: 12,
    borderBottom: "1px solid " + theme.palette.divider,
  },
  list: {
    overflowY: "scroll",
    transition: theme.transitions.create("height", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  listItem: {
    backgroundColor: theme.palette.background.paper,
    "&:hover": {
      opacity: 0.8,
    },
    transition: theme.transitions.create("opacity", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    paddingLeft: 24,
    paddingRight: 24,
  },
}));

export function Cart({ data, handleClose }) {
  const classes = useStyles();
  const router = useRouter();
  const globalState = useGlobalState();
  const [promo, setPromo] = useState(globalState.promo);
  const dispatch = useGlobalDispatch();

  return (
    <List
      ListHeaderComponent={
        <Grid container item xs={12} alignItems="center" justify="flex-start">
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
          <Box pl={4.6}>
            <Typography variant="h6">Cart</Typography>
          </Box>
        </Grid>
      }
      listItemDivider={true}
      classes={{
        root: classes.root,
        header: classes.header,
        list: classes.list,
        listItem: classes.listItem,
        footer: classes.footer,
      }}
      // ItemSeparatorComponentProps={{
      //   height: 2,
      // }}
      // ItemSeparatorComponent={<Divider />}
      data={data.items}
      isEmpty={!data.items || data.items.length === 0}
      ListEmptyComponent={
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="200px"
          flex={1}
        >
          <Typography align="center" variant="subtitle2">
            Cart is empty
          </Typography>
        </Box>
      }
      renderItem={({ item, index }) => <ProductCard key={index} data={item} />}
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
      ListFooterComponent={
        <>
          <Grid
            item
            container
            xs={12}
            wrap="wrap"
            style={{ marginTop: 16 }}
            justify="space-between"
          >
            <Grid item style={{ paddingTop: 16, paddingBottom: 16 }}>
              <TextField
                id="promo"
                name="promo"
                label="Promo"
                type="text"
                value={promo}
                onChange={(e) => {
                  setPromo(e.target.value);
                }}
              />
            </Grid>
            <Grid item style={{ paddingTop: 16, paddingBottom: 16 }}>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                disabled={!globalState.promo && !promo}
                onClick={(e) => {
                  dispatch(updatePromo(promo));
                }}
              >
                Apply
              </Button>
            </Grid>
          </Grid>

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
                <Typography>
                  {data.shipping === 0 ? "Free" : `₹ ${data.shipping}`}
                </Typography>
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
            {data["promo"] && (
              <Grid item xs={12} container>
                <Grid item xs>
                  <Typography>Promo</Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    {data?.promo?.toUpperCase()}{" "}
                    {data["discount"] > 0 ? `(${data["discount"]}% off)` : "-"}
                  </Typography>
                </Grid>
              </Grid>
            )}
            {+data["itemDiscount"] > 0 && (
              <Grid item xs={12} container>
                <Grid item xs>
                  <Typography>Discount</Typography>
                </Grid>
                <Grid item>
                  <Typography> - ₹ {data.itemDiscount}</Typography>
                </Grid>
              </Grid>
            )}

            {+data["grandTotal"] > 0 && (
              <Grid item xs={12} container>
                <Grid item xs>
                  <Typography>Grand Total</Typography>
                </Grid>
                <Grid item>
                  <Typography>₹ {data["grandTotal"]}</Typography>
                </Grid>
              </Grid>
            )}
          </Grid>

          <Divider style={{ marginTop: 16, marginBottom: 16 }} />

          <Grid
            item
            xs={12}
            container
            alignItems="center"
            justify="center"
            style={{ paddingBottom: 16 }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              style={{ height: 56, marginTop: 16, marginBottom: 16 }}
              onClick={() => {
                if (data["grandTotal"] > 0) {
                  router.push("/checkout");
                }
              }}
              fullWidth
            >
              {"Proceed to checkout"}
            </Button>
          </Grid>
        </>
      }
    />
  );
}
