import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { storage } from "../utils/storage";
import { config, isBrowser } from "../config";
import { useRefreshAuth, useVerifyGoogleLogin } from "./useAuth";
import { useUserProfile } from "../users";
import { useRouter } from "next/router";
import { UserProfile } from "../api/user";

const AuthStateContext = createContext(null);
const AuthDispatchContext = createContext(null);

export function useAuthState() {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }
  return context;
}

export function useAuthDispatch() {
  const context = useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within a AuthProvider");
  }
  return context;
}

export interface State {
  isHydrated: boolean;
  isAuthenticated: boolean;
  user: Partial<UserProfile>;
  access_token?: string;
  refresh_token?: string;
}

export const initialState = {
  isHydrated: false,
  isAuthenticated: false,
  user: null,
};

export enum ActionKind {
  hydrate = "hydrate",
  login = "login",
  logout = "logout",
  setAuthState = "setAuthState",
}

export type Action = {
  type: ActionKind;
  payload?: any;
};

type LoginPayload = { access_token?: string; refresh_token?: string };

export const logout = (): Action => ({ type: ActionKind.logout });
export const login = (payload: LoginPayload): Action => ({
  type: ActionKind.login,
  payload,
});
export const setAuthState = (payload): Action => ({
  type: ActionKind.setAuthState,
  payload,
});

export const hydrate = (payload) => ({
  type: ActionKind.hydrate,
  payload,
});

const authReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionKind.hydrate:
      try {
        return {
          ...state,
          ...action.payload,
          isHydrated: true,
        };
      } catch (error) {
        return state;
      }
    case ActionKind.login:
      try {
        const hasPutAccessToken = storage.put.access_token(
          action.payload.access_token
        );
        const hasPutRefreshToken = storage.put.refresh_token(
          action.payload.refresh_token
        );
        return {
          ...state,
          isAuthenticated: Boolean(hasPutAccessToken && hasPutRefreshToken),
        };
      } catch (error) {
        return state;
      }
    case ActionKind.logout:
      try {
        storage.clear();
        return {
          ...initialState,
        };
      } catch (error) {
        return state;
      }

    case ActionKind.setAuthState:
      try {
        return {
          ...state,
          ...action.payload,
        };
      } catch (error) {
        return state;
      }
    default:
      return state;
  }
};
const privateRoutes = new Set(["/cart", "/orders"]);
// Provider hook that creates auth object and handles state
function useAuth() {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [isGoogleLibLoaded, setIsGoogleLibLoaded] = useState(false);
  const getUserProfile = useUserProfile();
  const refreshAuthToken = useRefreshAuth();
  const verifyGoogleLogin = useVerifyGoogleLogin();
  const router = useRouter();

  useEffect(() => {
    if (state.isAuthenticated) {
      if (router.route === "/login" || router.route === "/signup") {
        router.replace("/");
      }
    } else {
      if (privateRoutes.has(router.route)) {
        router.replace("/login");
      }
    }
  }, [router.route, state]);

  useEffect(() => {
    async function hydrateAsync() {
      try {
        const hasAccessToken = storage.get.access_token();
        if (hasAccessToken) {
          const userProfile = storage.get.user_profile();
          dispatch(hydrate({ isAuthenticated: true, user: userProfile }));
        } else {
          const hasRefreshToken = storage.get.refresh_token();
          if (hasRefreshToken) {
            try {
              const response = await refreshAuthToken.mutateAsync({});
              dispatch(
                login({
                  access_token: response.data.access_token,
                  refresh_token: response.data.refresh_token,
                })
              );
            } catch (error) {
              // not valid maybe?
              dispatch(logout());
            }
          } else {
            // has no refresh or access token
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setAuthState({ isHydrated: true }));
      }
    }
    if (state.isHydrated === false) {
      hydrateAsync();
    }
  }, []);

  useEffect(() => {
    async function getProfileAsync() {
      try {
        const response = await getUserProfile.mutateAsync();
        storage.put.user_profile(response.data);
        dispatch(setAuthState({ user: response.data }));
      } catch (error) {
        dispatch(logout());
      }
    }

    if (state.isHydrated && state.isAuthenticated && state.user === null) {
      getProfileAsync();
    }

  }, [state.isAuthenticated, state.isHydrated, state.user]);

  useEffect(() => {
    if (
      isGoogleLibLoaded &&
      state.isHydrated &&
      state.isAuthenticated === false
    ) {
      const google = window["google"];
      if (google) {
        google.accounts.id.prompt();
      }
    }
  }, [state.isAuthenticated, state.isHydrated, isGoogleLibLoaded]);

  useEffect(() => {
    function initializeGoogleLogin() {
      const google = window["google"];
      if (!google) {
        return;
      }
      google.accounts.id.initialize({
        client_id: config.googleOAuthOptions.clientID,
        ux_mode: "popup",
        callback: function handleCredentialResponse(response) {
          verifyGoogleLogin
            .mutateAsync(response)
            .then((response) => {
              dispatch(
                login({
                  access_token: response.data["access_token"],
                  refresh_token: response.data["refresh_token"],
                })
              );
            })
            .catch(console.error);
        },
      });
      const divBtn = window.document.getElementById("google-button");
      if (divBtn) {
        google.accounts.id.renderButton(divBtn, {
          theme: "outline",
          size: "large",
          text: "continue_with",
        });
      }
      setIsGoogleLibLoaded(true);
    }
    window.addEventListener("load", initializeGoogleLogin);
    return () => window.removeEventListener("load", initializeGoogleLogin);
  }, []);

  return {
    state,
    dispatch,
  };
}

export const AuthProvider = ({ children }) => {
  const { state, dispatch } = useAuth();
  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

export * from "./useAuth";
