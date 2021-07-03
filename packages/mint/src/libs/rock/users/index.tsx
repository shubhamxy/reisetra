import React, { createContext, useContext, useReducer } from "react";
const UserStateContext = createContext<UserState>(null);
const UserDispatchContext = createContext(null);

export function useUserState(): UserState {
  const context = useContext(UserStateContext);
  if (context === undefined) {
    throw new Error(
      "useUserState must be used within a UserStateContextProvider"
    );
  }
  return context;
}

export function useUserDispatch(): React.Dispatch<Action> {
  const context = useContext<React.Dispatch<Action>>(UserDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useUserDispatch must be used within a UserDispatchContext"
    );
  }
  return context;
}

interface UserState {}

const initialState: UserState = {};

enum ActionKind {}

type Action = {
  type: ActionKind;
  payload?: any;
};

function reducer(state: UserState, action: Action): UserState {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
}

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

export * from "./useUser";
