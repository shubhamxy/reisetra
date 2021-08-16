import React, { useEffect } from "react";
import {
  Paper,
  Box,
  Typography,
  makeStyles,
  CircularProgress,
  Divider,
  Button,
} from "@material-ui/core";
import { List } from "../List/List";
import { Footer } from "../List";
import { useProducts } from "../../libs";
import { ProductCard } from "./Card";
import { getTotalCount, getTotalDataCount } from "../../libs/rock/utils/data";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    marginTop: "16px",
    overflow: "hidden",
    backgroundColor: theme.palette.type === "dark" ? "#2d2131" : "#e8e8e8",
  },
  header: {},
  title: {},
  list: {
    overflowX: "hidden",
    overflowY: "auto",
    maxHeight: 400,
    listStyle: "none",
    textDecoration: "none",
  },
}));

export function CheckoutCartList({ title = "Cart", data }) {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Box overflow="auto" maxHeight={"600px"} className="scrollbar">
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
              <Typography variant="subtitle2">Empty Cart</Typography>
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
    </Paper>
  );
}
