import { UserProfile } from "../../api/user";

const { version } = require("../../../../../package.json");

/**
 * @description Mixpanel events types
 */
export enum Events {
  login = "Login",
  logout = "Logout",
  identify = "Identify",
  signup = "Sign Up",
  page_loaded = "Page Loaded",
  metrics = "Metrics",
  file_upload = "File Upload",
  click = "Click",
  scroll_depth = "Scroll Depth",
}
export enum Properties {
  page_viewed = "$page_viewed",
}
export enum User {
  name = "$name",
  email = "$email",
  avatar = "$avatar",
  phone = "$phone",
  date_of_birth = "$date_of_birth",
  active = "$active",
  user_state = "$user_state",
  user_role = "$user_role",
  created_at = "$created",
  updated_at = "$updated",
}

export const mapUserProperties = (user: Partial<UserProfile>) => ({
  [User.avatar]: user.avatar,
  [User.email]: user.email,
  [User.name]: user.name,
  [User.phone]: user.phone,
  [User.date_of_birth]: user.dateOfBirth ? user.dateOfBirth.toString() : "",
  [User.active]: true,
  [User.created_at]: user.createdAt ? user.createdAt.toString() : "",
  [User.updated_at]: user.updatedAt ? user.updatedAt.toString() : "",
});

export const initial_props = {
  $client_version: version,
};

export enum UserState {
  logged_out = "Logged Out",
  logged_in = "Logged In",
}

export enum AppState {}

export enum CartState {}

export enum Metrics {
  metric_id = "$metric_id",
  metric_label = "$metric_label",
  metric_name = "$metric_name",
  metric_value = "$metric_value",
}

export enum MetricsName {
  FCP = "First Contentful Paint (FCP)",
  LCP = "Largest Contentful Paint (LCP)",
  CLS = "Cumulative Layout Shift (CLS)",
  FID = "First Input Delay (FID)",
  TTFB = "Time to first byte (TTFB)",
  "Next.js-hydration" = "Page Hydration Metric",
  "Next.js-route-change-to-render" = "Route Change Render Metric",
  "Next.js-render" = "Page Render Metric",
}

export const LinksTracker = "";
