import React, { createContext, useContext, useReducer } from "react";
const TransactionsStateContext = createContext<TransactionsState>(null);
const TransactionsDispatchContext = createContext(null);

export function useTransactionsState(): TransactionsState {
  const context = useContext(TransactionsStateContext);
  if (context === undefined) {
    throw new Error(
      "useTransactionsState must be used within a TransactionsStateContextProvider"
    );
  }
  return context;
}

export function useTransactionsDispatch(): React.Dispatch<Action> {
  const context = useContext<React.Dispatch<Action>>(TransactionsDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useTransactionsDispatch must be used within a TransactionsDispatchContext"
    );
  }
  return context;
}

interface TransactionsState {}

const initialState: TransactionsState = {};

enum ActionKind {}

type Action = {
  type: ActionKind;
  payload?: any;
};

function reducer(state: TransactionsState, action: Action): TransactionsState {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
}

export const TransactionsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <TransactionsStateContext.Provider value={state}>
      <TransactionsDispatchContext.Provider value={dispatch}>
        {children}
      </TransactionsDispatchContext.Provider>
    </TransactionsStateContext.Provider>
  );
};
