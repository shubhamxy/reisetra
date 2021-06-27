import { UserProfile } from "../../api/user";
import { config, isBrowser } from "../../config";
import {
  Events,
  initial_props,
  mapUserProperties,
  User,
  UserState,
} from "./types";

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageView = (pathName: string) => {
  if (isBrowser && typeof window["gtag"] === "function") {
    // @ts-ignore
    window.gtag("config", config.analytics.gaMeasurementId , {
      ...initial_props,
      page_path: pathName,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = (
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
) => {
  if (isBrowser && typeof window["gtag"] === "function") {
    // @ts-ignore
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

export async function login() {
  event(Events.login, {
    category: "user",
    label: User.user_state,
    value: UserState.logged_in,
  });
}

export function logout() {
  event(Events.logout, {
    category: "user",
    label: User.user_state,
    value: UserState.logged_out,
  });
}

export function identify(user: Partial<UserProfile>) {
  if (user.id) {
    if (isBrowser && typeof window["gtag"] === "function") {
      // @ts-ignore
      window.gtag("config", config.analytics.gaMeasurementId, {
        ...mapUserProperties(user),
        "user_id": user.id,
      });
    }
  }
}

export function metrics(data) {
  event(Events.metrics, {
    category: "metrics",
    label: Events.metrics,
    value: data,
  });
}
