import React from "react";
import {
  AccordionSummary,
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Chip,
  FormControlLabel,
  Grid,
  Typography,
} from "@material-ui/core";
import { formatDistance, subDays } from "date-fns";
import { useStyles } from "./styles";
import { useRouter } from "next/router";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { ExpandMore, Edit, Delete, Cancel } from "@material-ui/icons";
import { OrderTimeline } from "./Timeline";
import { useCancelOrder, useUpdateOrder } from "../../libs";
function useHelper({ id }) {
  const router = useRouter();
  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/product/${id}?ref=${encodeURIComponent(router.asPath)}`);
  }
  return {
    handleClick,
  };
}

export function OrderCard({ data, selected, setSelected }) {
  const {
    id,
    subTotal,
    itemDiscount,
    tax,
    shipping,
    total,
    discount,
    grandTotal,
    promo,
    userId,
    addressId,
    cartId,
    status,
    active,
    createdAt,
    cart,
    updatedAt,
    address: {
      fullname,
      address,
      region,
      nearby,
      zipcode,
      city,
      state,
      country,
      phone,
      email,
    },
  } = data;
  const { handleClick } = useHelper({
    id,
  });
  const cancelOrder = useCancelOrder();
  const updateOrder = useUpdateOrder();

  const classes = useStyles({ status });
  const OrderSummary = (
    <Grid item xs={6} style={{ position: "relative" }}>
      <Grid item xs={12} container alignItems="center" justify="center">
        {cart && (
          <Grid item xs={12} container>
            <Grid item xs>
              <Typography className={classes.subtext}>Cart Items</Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.subtext}>
                {cart?.items?.length || "1"}
              </Typography>
            </Grid>
          </Grid>
        )}
        <Grid item xs={12} container>
          <Grid item xs>
            <Typography className={classes.subtext}>Subtotal</Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.subtext}>₹{subTotal}</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} container>
          <Grid item xs>
            <Typography className={classes.subtext}>Taxes</Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.subtext}>₹{tax}</Typography>
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
              {shipping === 0 ? "Free" : `₹${shipping || 0}`}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} container>
          <Grid item xs>
            <Typography className={classes.subtext}>Total</Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.subtext}>₹{total || 0}</Typography>
          </Grid>
        </Grid>
        {promo && (
          <Grid item xs={12} container>
            <Grid item xs>
              <Typography className={classes.subtext}>Promo</Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.subtext}>
                {promo?.toUpperCase()}{" "}
                {discount > 0 ? `(${discount}% off)` : "-"}
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
                -₹{itemDiscount || 0}
              </Typography>
            </Grid>
          </Grid>
        )}

        {+grandTotal > 0 && (
          <Grid item xs={12} container>
            <Grid item xs>
              <Typography className={classes.subtext}>Grand Total</Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.subtext}>
                ₹{grandTotal || 0}
              </Typography>
            </Grid>
          </Grid>
        )}
      </Grid>

      <Grid item xs={12} container alignItems="center" justify="center">
        <Grid item xs={12} container>
          <Grid item xs>
            <Typography className={classes.subtext}>Address</Typography>
          </Grid>
          <Grid item style={{ textAlign: "right" }}>
            <Typography className={classes.subtext}>{address}</Typography>
            <Typography className={classes.subtext}>
              {region}, {nearby}
            </Typography>

            <Typography className={classes.subtext}>
              {city}, {state}
            </Typography>

            <Typography className={classes.subtext}>
              {country}, {zipcode}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} container>
          <Grid item xs>
            <Typography className={classes.subtext}>Order Status</Typography>
          </Grid>
          <Grid item style={{ paddingTop: 8.4 }}>
            <Chip
              variant="outlined"
              label={
                <Typography
                  className={classes.subtext}
                  style={{ textTransform: "capitalize" }}
                >
                  {String(status).toLowerCase()}
                </Typography>
              }
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  const TimeLine = (
    <Grid item xs={6} container alignItems="center" justify="center">
      <OrderTimeline status={status} />
    </Grid>
  );
  return (
    <Accordion className={classes.root} variant="outlined">
      <AccordionSummary expandIcon={<ExpandMore />}>
        {/* <FormControlLabel
          aria-label="Acknowledge"
          onClick={(event) => {
            event.stopPropagation();
            if (selected === id) {
              setSelected(null);
            } else {
              setSelected(id);
            }
          }}
          onFocus={(event) => event.stopPropagation()}
          control={<Checkbox color="primary" checked={id === selected} />}
          label={
            <Typography
              className={classes.heading}
              variant="body2"
              color="textPrimary"
              component="p"
            >
              Ordered
              {formatDistance(new Date(createdAt), new Date(), {
                addSuffix: true,
              })}
            </Typography>
          }
        /> */}
        <Typography
          className={classes.heading}
          variant="body2"
          color="textPrimary"
          component="p"
        >
          Ordered{" "}
          {formatDistance(new Date(createdAt), new Date(), {
            addSuffix: true,
          })}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={4}>
          <Grid container item xs={12} justify="flex-end">
            {status === "PENDING" && (
              <ButtonGroup>
                <Button
                  size="medium"
                  variant="text"
                  color="primary"
                  disabled
                  onClick={() => {
                    updateOrder.mutate({
                      orderId: id,
                      body: {
                        ...data,
                      },
                    });
                  }}
                >
                  <Edit style={{ height: 14, width: 14 }} />
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  size="medium"
                  onClick={() => {
                    cancelOrder.mutate(id);
                  }}
                >
                  <Cancel style={{ height: 14, width: 14 }} />
                </Button>
              </ButtonGroup>
            )}
          </Grid>
          {OrderSummary}
          {TimeLine}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
