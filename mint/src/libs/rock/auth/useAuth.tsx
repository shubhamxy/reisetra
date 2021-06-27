import { useMutation } from "react-query";
import { refreshAuthToken, loginEmailForgotPassword, oauthGoogleVerify, loginEmail, signupEmail, loginEmailResetPassword } from "../api/auth";
import { updateSnackBar, useGlobalDispatch } from "../global";
import { analytics } from "../utils";

export const useRefreshAuth = () => {
  const dispatch = useGlobalDispatch();
  return useMutation(refreshAuthToken, {
    onSuccess: () => {
      dispatch(updateSnackBar({
        message: 'Auth refreshed Successfully',
        type: "success",
        open: true,
      }));
      analytics.login();
    },
    onError: (error) => {
      dispatch(updateSnackBar({
        message: error['message'] || 'Server Error',
        type: "error",
        open: true,
      }));
    }
  })
};
export const useVerifyGoogleLogin = () => {
  const dispatch = useGlobalDispatch();
  return useMutation(oauthGoogleVerify, {
    onSuccess: () => {
      dispatch(updateSnackBar({
        message: 'Google verification success',
        type: "success",
        open: true,
      }));
      analytics.login();
    },
    onError: (error) => {
      dispatch(updateSnackBar({
        message: error['message'] || 'Server Error',
        type: "error",
        open: true,
      }));
    }
  })
};
export const useUserEmailLogin = () => {
  const dispatch = useGlobalDispatch();
  return useMutation(loginEmail, {
    onSuccess: () => {
      dispatch(updateSnackBar({
        message: 'Email login success',
        type: "success",
        open: true,
      }));
      analytics.login();
    },
    onError: (error) => {
      dispatch(updateSnackBar({
        message: error['message'] || 'Server Error',
        type: "error",
        open: true,
      }));
    }
  })
};
export const useUserEmailForgotPassword = () => {
  const dispatch = useGlobalDispatch();
  return useMutation(loginEmailForgotPassword, {
    onSuccess: () => {
      dispatch(updateSnackBar({
        message: 'Success',
        type: "success",
        open: true,
      }));
    },
    onError: (error) => {
      dispatch(updateSnackBar({
        message: error['message'] || 'Server Error',
        type: "error",
        open: true,
      }));
    }
  })
};
export const useUserEmailResetPassword = () => {
  const dispatch = useGlobalDispatch();
  return useMutation(loginEmailResetPassword, {
    onSuccess: () => {
      dispatch(updateSnackBar({
        message: 'Password Reset Successfull',
        type: "success",
        open: true,
      }));
      analytics.login();
    },
    onError: (error) => {
      dispatch(updateSnackBar({
        message: error['message'] || 'Server Error',
        type: "error",
        open: true,
      }));
    }
  })
};


export const useUserEmailSignUp = () => {
  const dispatch = useGlobalDispatch();
  return useMutation(signupEmail, {
    onSuccess: () => {
      dispatch(updateSnackBar({
        message: 'Email Signup Success',
        type: "success",
        open: true,
      }));
      analytics.login();
    },
    onError: (error) => {
      dispatch(updateSnackBar({
        message: error['message'] || 'Server Error',
        type: "error",
        open: true,
      }));
    }
  })
};
