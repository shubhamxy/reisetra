import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {useTheme } from "@material-ui/core/styles";
import {
  ButtonGroup,
} from "@material-ui/core";
import { useCancelOrder, useOrders, useUpdateOrder } from "../../libs";
import { useState } from "react";
import { OrderList } from "../../ui/Orders";

export function Orders() {
  const [selected, setSelected] = useState();
  const userOrders = useOrders();
  const cancelOrder = useCancelOrder();
  const updateOrder = useUpdateOrder();
  const theme = useTheme();
  return (
    <Grid container alignContent="center" justify="center" direction="column">
      <Grid container item xs={12}>
        <Grid item xs={12} justify="space-between" style={{ display: "flex" }}>
          <ButtonGroup>
            {/* <Button
              variant="contained"
              color="primary"
              size="medium"
              onClick={() => {
                setSelected(null);
              }}
            >
              Add
            </Button> */}
          </ButtonGroup>
          {selected && (
            <ButtonGroup>
              <Button
                disabled={true}
                size="medium"
                variant="text"
                color="primary"
                onClick={() => {
                  updateOrder.mutate({
                    orderId: selected,
                    body: {

                    }
                  });
                }}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                size="medium"
                style={{backgroundColor: theme.palette.error.main}}
                disabled={!selected}
                onClick={() => {
                  cancelOrder.mutate(selected);
                }}
              >
                Cancel
              </Button>
            </ButtonGroup>
          )}
        </Grid>
      </Grid>
      <Grid container item xs={12}>
        <Grid item xs={12}>
          <OrderList
            data={userOrders.data}
            hasNextPage={userOrders.hasNextPage}
            fetchNextPage={userOrders.fetchNextPage}
            selected={selected}
            setSelected={setSelected}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
