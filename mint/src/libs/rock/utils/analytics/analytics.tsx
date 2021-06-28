import { NextWebVitalsMetric } from "next/dist/next-server/lib/utils";
import { MetricsName, Metrics } from "./types";
import * as mixpanel from "./mixpanel";
import * as gtag from "./gtag";
import { UserProfile } from "../../api/user";

export function pageView(pathName: string) {
  if (!pathName) {
    return;
  }
  try {
    mixpanel.pageView(pathName);
    gtag.pageView(pathName);
  } catch (error) {
    console.log("analytics ->", error);
  }
}

export async function login() {
  try {
    mixpanel.login();
    gtag.login();
  } catch (error) {
    console.log("analytics ->", error);
  }
}

export function logout() {
  try {
    mixpanel.logout();
    gtag.logout();
  } catch (error) {
    console.log("analytics ->", error);
  }
}

export function identify(user: Partial<UserProfile>) {
  if (!user) {
    return;
  }
  try {
    mixpanel.identify(user);
    gtag.identify(user);
  } catch (error) {
    console.log("analytics ->", error);
  }
}

export function metrics(metric: NextWebVitalsMetric) {
  if (!metric) {
    return;
  }
  try {
    const metricValue = Math.round(
      metric.name === MetricsName.CLS ? metric.value * 1000 : metric.value
    );
    const data = {
      [Metrics.metric_id]: metric.id,
      [Metrics.metric_label]: metric.label,
      [Metrics.metric_name]: MetricsName[metric.name],
      [Metrics.metric_value]: metricValue,
    };

    mixpanel.metrics(data);
    gtag.metrics(data);
  } catch (error) {
    console.log("analytics ->", error);
  }
}
