import React from "react";
import {
  AccordionSummary,
  Box,
  Checkbox,
  FormControlLabel,
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
            if(selected === id) {
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
      <AccordionDetails>
        <Box className={classes.content}>
          <Typography
            className={classes.contentText}
            variant="body1"
            color="textPrimary"
            component="p"
          >
            {address}
          </Typography>
          <Box display="flex" flexDirection="column">
            <Box display="flex" justifyContent="space-between" flex={1}>
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
            </Box>

            <Box display="flex">
              <Typography
                className={classes.subText}
                variant="body1"
                color="textPrimary"
                component="span"
                style={{ paddingRight: 4, textDecoration: "line-through" }}
              ></Typography>
              <Typography
                className={classes.subText}
                variant="body1"
                color="textPrimary"
                component="span"
              ></Typography>
            </Box>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
