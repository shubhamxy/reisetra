import {
  Avatar,
  Box,
  Chip,
  createStyles,
  Divider,
  fade,
  Grid,
  List,
  ListItem,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import * as React from "react";
import { useAuthState, useCartItems, useGlobalState } from "../../libs";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      backgroundColor: "#1c2927",
      padding: "24px 32px 24px 32px",
    },
    badge: {
      top: "-10px !important",
    },
    percentage: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      fontSize: 21,
      lineHeight: 21,
      fontWeight: 700,
      right: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    list: {
      marginTop: 6,
      borderRadius: 6,
      padding: 0,
    },
    listItem: {
      marginTop: 5,
      paddingLeft: 0,
      paddingRight: 0,
      alignItems: "flex-start",
    },
    taglist: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
    },
    taglistitem: {
      background: "#dbe1d7",
      borderRadius: "48px",
      justifyContent: "center",
      alignItems: "center",
      boxShadow: "0px -28px 100px rgba(15, 15, 15, 0.0666248)",
      marginRight: "8px",
      marginBottom: "8px",
      "&:hover": {
        backgroundColor: "#dbe1d7",
      },
      "&:focus": {
        backgroundColor: "#dbe1d7",
        boxShadow: `0px 0px 0px 4px#d0f20f33`,
      },
    },
    listPrimaryText: {},
    action: {
      top: "35%",
      padding: "1px 6px 1px 6px",
      borderRadius: 9,
      fontSize: 12,
      backgroundColor: fade("#011632", 0.05),
    },
    subtext: {
      ...theme.typography.caption,
      color: "#ffffff",
    },
  })
);

export function CheckoutSummary() {
  const classes = useStyles();
  const authState = useAuthState();
  const globalState = useGlobalState();
  const { data: response } = useCartItems(
    authState?.user?.cart.id,
    globalState?.promo || null
  );
  const data = response.data;
  return (
    <Paper className={classes.root}>
      <Box
        display={"flex"}
        flexDirection="column"
        alignItems={"flex-start"}
        pb={2.6}
      >
        <Box pt={0.6} pb={0.6}>
          <Typography variant={"h5"}>
            Order Summary
          </Typography>
        </Box>

        <Typography variant={"caption"} >
          Grand total of your purchase
        </Typography>
      </Box>
      <Box display={"flex"} flexDirection={"column"}>
        <List
          classes={{
            root: classes.taglist,
          }}
          disablePadding
        >
          <Grid item xs={12} container alignItems="center" justify="center">
            <Grid item xs={12} container>
              <Grid item xs>
                <Typography className={classes.subtext}>Subtotal</Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.subtext}>
                  ₹{String(data["subTotal"] || 0)}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} container>
              <Grid item xs>
                <Typography className={classes.subtext}>Taxes</Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.subtext}>
                  ₹{data["tax"] || 0}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} container>
              <Grid item xs>
                <Typography className={classes.subtext}>
                  Estimated Shipping
                </Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.subtext}>
                  {data["shipping"] === 0 ? "Free" : `₹${data["shipping"] || 0}`}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} container>
              <Grid item xs>
                <Typography className={classes.subtext}>Total</Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.subtext}>
                  ₹{data["total"] || 0}
                </Typography>
              </Grid>
            </Grid>
            {data["promo"] && (
              <Grid item xs={12} container>
                <Grid item xs>
                  <Typography className={classes.subtext}>Promo</Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.subtext}>
                    {data?.["promo"]?.toUpperCase()}{" "}
                    {data["discount"] > 0 ? `(${data["discount"]}% off)` : "-"}
                  </Typography>
                </Grid>
              </Grid>
            )}
            {+data["itemDiscount"] > 0 && (
              <Grid item xs={12} container>
                <Grid item xs>
                  <Typography className={classes.subtext}>Discount</Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.subtext}>
                    -₹{data["itemDiscount"] || 0}
                  </Typography>
                </Grid>
              </Grid>
            )}

            {+data["grandTotal"] > 0 && (
              <Grid item xs={12} container>
                <Grid item xs>
                  <Typography className={classes.subtext}>
                    Grand Total
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.subtext}>
                    ₹{data["grandTotal"] || 0}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Grid>
        </List>
      </Box>
    </Paper>
  );
}
