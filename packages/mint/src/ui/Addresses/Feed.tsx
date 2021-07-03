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
  ButtonGroup,
} from "@material-ui/core";
import { List } from "../List/List";
import { ProductCard } from "./Card";

export const useStyles = makeStyles((theme) => ({
  root: { height: "100%", display: "flex", flexDirection: "column", flex: 1 },
  header: {},
  content: {},
  title: {},
  listRoot: {},
  list: {
    overflowX: "hidden",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export function AddressList({ data, selected, setSelected }) {
  const classes = useStyles();
  return (
    <List
      classes={{ list: classes.list }}
      data={data}
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
        <ProductCard
          key={index}
          data={item}
          selected={selected}
          setSelected={setSelected}
        />
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
  );
}
