import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import React, { createContext, useContext, useReducer } from "react";
import { Snackbar } from "../../../ui/SnackBar";
import { AuthProvider } from "../auth";
import { useTheme } from "../theme";
const GlobalStateContext = createContext<GlobalState>(null);
const GlobalDispatchContext = createContext(null);

export function useGlobalState(): GlobalState {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error(
      "useGlobalState must be used within a GlobalStateContextProvider"
    );
  }
  return context;
}

export function useGlobalDispatch(): React.Dispatch<Action> {
  const context = useContext<React.Dispatch<Action>>(GlobalDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useGlobalDispatch must be used within a GlobalDispatchContext"
    );
  }
  return context;
}

interface SnackBar {
  open: boolean;
  message: string;
  duration: number;
  type: "info" | "error" | "success";
  onClick?: Function;
}

interface GlobalState {
  snackbar: SnackBar;
  promo: string;
}

const initialState: GlobalState = {
  snackbar: {
    open: false,
    message: null,
    duration: 5000,
    type: "info",
    onClick: null,
  },
  promo: null,
};

enum ActionKind {
  OpenSnackBar = "OpenSnackBar",
  CloseSnackBar = "CloseSnackBar",
  UpdateSnackBar = "UpdateSnackBar",
  UpdatePromo = "UpdatePromo",
}

type Action = {
  type: ActionKind;
  payload?: Record<string, boolean | number> | Partial<SnackBar>;
};

export const openSnackBar: Action = {
  type: ActionKind.OpenSnackBar,
};

export const closeSnackBar: Action = {
  type: ActionKind.CloseSnackBar,
};

export const updateSnackBar = (payload: Partial<SnackBar>): Action => ({
  type: ActionKind.UpdateSnackBar,
  payload,
});

export const updatePromo = (payload: any): Action => ({
  type: ActionKind.UpdatePromo,
  payload,
});

function reducer(state: GlobalState, action: Action): GlobalState {
  const { type, payload } = action;
  switch (type) {
    case ActionKind.OpenSnackBar:
      return {
        ...state,
        snackbar: {
          ...state.snackbar,
          open: true,
        },
      };
    case ActionKind.CloseSnackBar:
      return {
        ...state,
        snackbar: {
          ...initialState.snackbar,
          open: false,
        },
      };
    case ActionKind.UpdateSnackBar:
      return {
        ...state,
        snackbar: {
          ...state.snackbar,
          ...action.payload,
        },
      };

      case ActionKind.UpdatePromo:
        return {
          ...state,
          promo: action.payload as string,
        };
    default:
      return state;
  }
}

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStateContext.Provider value={state}>
        <GlobalDispatchContext.Provider value={dispatch}>
          <AuthProvider>
            {children}
            <Snackbar />
          </AuthProvider>
        </GlobalDispatchContext.Provider>
      </GlobalStateContext.Provider>
    </ThemeProvider>
  );
};
