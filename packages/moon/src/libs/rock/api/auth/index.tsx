import { get, post } from "../../utils/http";
import { storage } from "../../utils/storage";

export type LoginT = {
  readonly email: string;
  readonly password: string;
};
export type ResetPasswordT = {
  readonly email: string;
  readonly token: string;
  readonly password: string;
};

export type SignupT = {
  email: string;
  password: string;
  name: string;
  dateOfBirth?: Date;
  phone?: string;
  avatar?: string;
  bio?: string;
};

export interface AuthResponse {
  id: string;
  email: string;
  role: string;
  expires_in: string;
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export function signupEmail(body: SignupT) {
  return post<LoginT, AuthResponse>("auth/email/signup", body);
}

export function loginEmail(body: LoginT) {
  return post<LoginT, AuthResponse>("auth/email/login", body);
}

export function loginEmailForgotPassword(email: string) {
  return get<AuthResponse>(`auth/email/forgot-password/${email}`);
}

export function loginEmailResetPassword(body: ResetPasswordT) {
  return post<ResetPasswordT, AuthResponse>("auth/email/reset-password", body);
}

export function loginOauth(provider = "google") {
  return get<LoginT, AuthResponse>(`auth/login/oauth/${provider}`);
}

export function oauthGoogleVerify(body) {
  return post<LoginT, AuthResponse>(`auth/login/oauth/google/verify`, body);
}

export function emailVerify({ id, token }) {
  return get(`auth/email/verify/${id}/${token}`);
}

export function emailResendVerification() {
  return get<AuthResponse>(`auth/email/resend-verification`);
}

export function userPasswordUpdate(body) {
  return post<LoginT, AuthResponse>(`auth/email/update-password`, body);
}

export function refreshAuthToken(config?: RequestInit) {
  const refresh_token = storage.get.refresh_token();
  config = config || {};
  config.headers = config.headers || {};
  config.headers["X-Refresh-Token"] =
    config.headers["X-Refresh-Token"] || refresh_token;
  return get<AuthResponse>(`auth/refresh`, config);
}
