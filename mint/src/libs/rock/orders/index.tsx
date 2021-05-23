import React, { createContext, useContext, useReducer } from "react";
const OrdersStateContext = createContext<OrdersState>(null);
const OrdersDispatchContext = createContext(null);

export function useOrdersState(): OrdersState {
  const context = useContext(OrdersStateContext);
  if (context === undefined) {
    throw new Error(
      "useOrdersState must be used within a OrdersStateContextProvider"
    );
  }
  return context;
}

export function useOrdersDispatch(): React.Dispatch<Action> {
  const context = useContext<React.Dispatch<Action>>(OrdersDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useOrdersDispatch must be used within a OrdersDispatchContext"
    );
  }
  return context;
}

interface OrdersState {}

const initialState: OrdersState = {};

enum ActionKind {}

type Action = {
  type: ActionKind;
  payload?: any;
};

function reducer(state: OrdersState, action: Action): OrdersState {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
}

export const OrdersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <OrdersStateContext.Provider value={state}>
      <OrdersDispatchContext.Provider value={dispatch}>
        {children}
      </OrdersDispatchContext.Provider>
    </OrdersStateContext.Provider>
  );
};
