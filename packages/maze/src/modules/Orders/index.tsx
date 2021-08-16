import {
  CircularProgress,
  Box, Container,
} from "@material-ui/core";
import React from "react";
import {
  getTotalCount, getTotalDataCount,
  useOrders,
} from "../../libs";
import { List, Footer } from "../../ui/List";
import OrderCard from "./order";

export function Orders() {
  const orders = useOrders();
  return (
    <Container maxWidth="md">
      <List
        classes={{}}
        variant="infinite"
        data={orders.data}
        renderItem={({ item }) => (
          <OrderCard
            {...item}
            selected
            key={item.id}
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
            hasNextPage={orders?.hasNextPage}
            fetchNextPage={orders?.fetchNextPage}
            totalDataCount={getTotalDataCount(orders?.data)}
            totalCount={getTotalCount(orders?.data)}
          // isLoading={isLoading}
          />
        }
      />
    </Container>

  );
}
