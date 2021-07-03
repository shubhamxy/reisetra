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
import { OrderCard } from "./Card";
import { Footer } from "../List";
import { getTotalCount, getTotalDataCount } from "../../libs/rock/utils/data";

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

export function OrderList({ data, hasNextPage, fetchNextPage, selected, setSelected }) {
  const classes = useStyles();
  return (
    <Box overflow="auto" className="scrollbar">
      <List
        classes={{ list: classes.list }}
        data={data}
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
          <OrderCard key={index} data={item} selected={selected} setSelected={setSelected} />
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
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            totalDataCount={getTotalDataCount(data)}
            totalCount={getTotalCount(data)}
            // isLoading={isLoading}
          />
        }
      />
    </Box>
  );
}
