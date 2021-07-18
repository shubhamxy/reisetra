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
  ButtonGroup,
  useTheme,
} from "@material-ui/core";
import { List } from "../List/List";
import { OrderCard } from "./Card";
import { Footer } from "../List";
import { getTotalCount, getTotalDataCount } from "../../libs/rock/utils/data";
import { useCancelOrder, useOrders, useUpdateOrder } from "../../libs";

export const useStyles = makeStyles((theme) => ({
  root: { height: "100%", display: "flex", flexDirection: "column", flex: 1 },
  header: {},
  content: {},
  title: {},
  listRoot: {},
  list: {},
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export function OrderList() {
  const classes = useStyles();
  const [selected, setSelected] = useState();
  const userOrders = useOrders();
  const cancelOrder = useCancelOrder();
  const updateOrder = useUpdateOrder();
  const theme = useTheme();
  return (
    <Box overflow="auto" className="scrollbar">
      <List
        classes={{ list: classes.list }}
        data={userOrders.data}
        variant="infinite"

        ListEmptyComponent={
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="320px"
          >
            <Typography align="center" variant="subtitle2">
              No Orders
            </Typography>
          </Box>
        }
        renderItem={({ item, index }) => (
          <OrderCard
            key={index}
            data={item}
            selected={selected}
            setSelected={setSelected}
          />
        )}
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
          <Footer
            hasNextPage={userOrders?.hasNextPage}
            fetchNextPage={userOrders?.fetchNextPage}
            totalDataCount={getTotalDataCount(userOrders?.data)}
            totalCount={getTotalCount(userOrders?.data)}
            // isLoading={isLoading}
          />
        }
      />
    </Box>
  );
}
