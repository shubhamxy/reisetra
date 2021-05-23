import React, { createContext, useContext, useReducer } from "react";
const CartStateContext = createContext<CartState>(null);
const CartDispatchContext = createContext(null);

export function useCartState(): CartState {
  const context = useContext(CartStateContext);
  if (context === undefined) {
    throw new Error(
      "useCartState must be used within a CartStateContextProvider"
    );
  }
  return context;
}

export function useCartDispatch(): React.Dispatch<Action> {
  const context = useContext<React.Dispatch<Action>>(CartDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useCartDispatch must be used within a CartDispatchContext"
    );
  }
  return context;
}

interface CartState {}

const initialState: CartState = {};

enum ActionKind {}

type Action = {
  type: ActionKind;
  payload?: any;
};

function reducer(state: CartState, action: Action): CartState {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
};
