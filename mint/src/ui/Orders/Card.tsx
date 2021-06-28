import React from "react";
import {
  AccordionSummary,
  Box,
  Checkbox,
  Chip,
  FormControlLabel,
  Grid,
  Typography,
} from "@material-ui/core";
import { useStyles } from "./styles";
import { useRouter } from "next/router";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
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

  const classes = useStyles({status});
  const OrderSummary = (
    <Grid item xs={6}>
      <Grid item xs={12} container alignItems="center" justify="center">
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
              <Typography className={classes.subtext}>₹{grandTotal || 0}</Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );

  const Address = (
    <Grid item xs={6}>
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
        <Grid item xs={12} container >
          <Grid item xs>
            <Typography className={classes.subtext}>Order Status</Typography>
          </Grid>
          <Grid item style={{paddingTop: 8.4}}>
            <Chip
              variant="default"
              color="primary"
              className={classes.chip}
              clickable
              label={
                <Typography className={classes.subtext} style={{textTransform: "capitalize"}}>{String(status).toLowerCase()}</Typography>
              }
            ></Chip>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
  return (
    <Accordion className={classes.root} variant="outlined">
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <FormControlLabel
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
          control={<Checkbox checked={id === selected} />}
          label={
            <Typography
              className={classes.heading}
              variant="body2"
              color="textPrimary"
              component="p"
            >
              Order on {new Date(createdAt).toLocaleString()}
            </Typography>
          }
        />
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={4}>
          {OrderSummary}
          {Address}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
