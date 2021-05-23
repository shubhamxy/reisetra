import { useMutation } from "react-query";
import { refreshAuthToken, loginEmailForgotPassword, oauthGoogleVerify, loginEmail, signupEmail, loginEmailResetPassword } from "../api/auth";

export const useRefreshAuth = () => useMutation(refreshAuthToken);
export const useVerifyGoogleLogin = () => useMutation(oauthGoogleVerify);
export const useUserEmailLogin = () => useMutation(loginEmail);
export const useUserEmailForgotPassword = () => useMutation(loginEmailForgotPassword);
export const useUserEmailResetPassword = () => useMutation(loginEmailResetPassword);


export const useUserEmailSignUp = () => useMutation(signupEmail);


