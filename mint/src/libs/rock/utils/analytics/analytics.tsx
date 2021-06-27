import { NextWebVitalsMetric } from "next/dist/next-server/lib/utils";
import {
  MetricsName,
  Metrics,
} from "./types";
import * as mixpanel from  './mixpanel';
import * as gtag from  './gtag';
import { UserProfile } from "../../api/user";

export function pageView(pathName: string) {
  mixpanel.pageView(pathName);
  gtag.pageView(pathName);
}

export async function login() {
  mixpanel.login();
  gtag.login();
}

export function logout() {
  mixpanel.logout();
  gtag.logout();
}

export function identify(user: Partial<UserProfile>) {
  mixpanel.identify(user);
  gtag.identify(user);
}

export function metrics(metric: NextWebVitalsMetric) {
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
}
