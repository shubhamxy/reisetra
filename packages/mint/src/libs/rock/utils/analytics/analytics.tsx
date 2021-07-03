import { NextWebVitalsMetric } from "next/dist/next-server/lib/utils";
import { MetricsName, Metrics } from "./types";
import * as mixpanel from "./mixpanel";
import * as gtag from "./gtag";
import * as logrocket from './logrocket';
import { UserProfile } from "../../api/user";
import { config, isBrowser } from "../../config";
function caller(fnName: string, ...params) {
  if(!isBrowser) {return}
  if (config.analytics.enableMixpanel) {
    mixpanel[fnName]?.(...params);
  }
  if (config.analytics.enableLogrocket) {
    logrocket[fnName]?.(...params);
  }
  if (config.analytics.enableGTag) {
    gtag[fnName]?.(...params);
  }
}
export async function initialize() {
  try {
    caller('initialize');
  } catch (error) {
    console.error("analytics", error);
  }
}

export async function pageView(pathName: string) {
  if (!pathName) {
    return;
  }
  try {
    caller('pageView', pathName);
  } catch (error) {
    console.error("analytics", error);
  }
}

export async function login() {
  try {
    caller('login');
  } catch (error) {
    console.error("analytics", error);
  }
}

export async function logout() {
  try {
    caller('logout');
  } catch (error) {
    console.error("analytics", error);
  }
}

export async function identify(user: Partial<UserProfile>) {
  if (!user) {
    return;
  }
  try {
    caller('identify', user);
  } catch (error) {
    console.error("analytics", error);
  }
}

export async function metrics(metric: NextWebVitalsMetric) {
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
    caller('metrics', metric);
  } catch (error) {
    console.error("analytics", error);
  }
}
