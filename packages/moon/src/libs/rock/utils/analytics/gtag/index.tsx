import { UserProfile } from "../../../api/user";
import { config, isBrowser } from "../../../config";
import {
  Events,
  initial_props,
  mapUserProperties,
  User,
  UserState,
} from "../types";

export async function initialize() {
  console.log({ initialize: "xxx" });
}
export async function pageView(pathName: string) {
  // https://developers.google.com/analytics/devguides/collection/gtagjs/pages
  console.log({ pathName });
  if (isBrowser && typeof window["gtag"] === "function") {
    // @ts-ignore
    window.gtag("config", config.analytics.gaMeasurementId, {
      ...initial_props,
      page_path: pathName,
    });
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export async function event(
  action: string,
  {
    category,
    label,
    value,
  }: {
    category: string;
    label: string;
    value: string;
  }
) {
  if (isBrowser && typeof window["gtag"] === "function") {
    // @ts-ignore
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

export async function login() {
  event(Events.login, {
    category: "user",
    label: User.user_state,
    value: UserState.logged_in,
  });
}

export async function logout() {
  event(Events.logout, {
    category: "user",
    label: User.user_state,
    value: UserState.logged_out,
  });
}

export async function identify(user: Partial<UserProfile>) {
  if (isBrowser && typeof window["gtag"] === "function" && user.id) {
    // @ts-ignore
    window.gtag("config", config.analytics.gaMeasurementId, {
      ...mapUserProperties(user),
      user_id: user.id,
    });
  }
}

export async function metrics(data) {
  event(Events.metrics, {
    category: "metrics",
    label: Events.metrics,
    value: data,
  });
}
