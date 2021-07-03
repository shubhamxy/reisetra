import React from "react";
import {
  AccordionSummary,
  Box,
  Checkbox,
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
export function ProductCard({ data, selected, setSelected }) {
  const {
    active,
    address,
    city,
    country,
    createdAt,
    email,
    fullname,
    id,
    nearby,
    phone,
    region,
    state,
    updatedAt,
    userId,
    zipcode,
  } = data;
  const { handleClick } = useHelper({
    id,
  });

  const classes = useStyles();
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
              {fullname}
            </Typography>
          }
        />
      </AccordionSummary>
      <AccordionDetails style={{ paddingBottom: 24 }}>
        <Grid container spacing={2}>
          <Grid container item xs={12}>
            <Grid container item xs={12}>
              <Typography
                className={classes.contentText}
                variant="body1"
                color="textPrimary"
                component="p"
              >
                {address}
              </Typography>
            </Grid>
          </Grid>
          <Grid container item xs={12} justify="space-between" spacing={2}>
            <Grid
              container
              item
              xs={12}
              md={6}
              justify="space-between"
              spacing={2}
            >
              <Grid item xs={6}>
                {region && (
                  <Typography
                    className={classes.subText}
                    variant="body1"
                    color="textPrimary"
                    component="span"
                  >
                    {region}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={6}>
                {nearby && (
                  <Typography
                    className={classes.subText}
                    variant="body1"
                    color="textPrimary"
                    component="span"
                  >
                    Near {nearby}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={6}>
                {city && (
                  <Typography
                    className={classes.subText}
                    variant="body1"
                    color="textPrimary"
                    component="span"
                  >
                    {city}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={6}>
                {state && (
                  <Typography
                    className={classes.subText}
                    variant="body1"
                    color="textPrimary"
                    component="span"
                  >
                    {state}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={6}>
                {country && (
                  <Typography
                    className={classes.subText}
                    variant="body1"
                    color="textPrimary"
                    component="span"
                  >
                    {country}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={6}>
                {zipcode && (
                  <Typography
                    className={classes.subText}
                    variant="body1"
                    color="textPrimary"
                    component="span"
                  >
                    {zipcode}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={12}
              md={6}
              justify="space-between"
              style={{textAlign: "right"}}
              spacing={2}
            >
              <Grid item xs={12}>
                {email && (
                  <Typography
                    className={classes.subText}
                    variant="body1"
                    color="textPrimary"
                    component="span"
                  >
                    {email}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                {phone && (
                  <Typography
                    className={classes.subText}
                    variant="body1"
                    color="textPrimary"
                    component="span"
                  >
                    {phone}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
