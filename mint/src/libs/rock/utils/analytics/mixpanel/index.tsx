import mixpanel from "mixpanel-browser";
import { UserProfile } from "../../../api/user";
import { config, isBrowser } from "../../../config";
import {
  Events,
  mapUserProperties,
  User,
  UserState,
  Properties,
} from "../types";

export function initialize() {
  if (isBrowser && config.analytics.enableMixpanel) {
    mixpanel.init(config.analytics.mixpanelToken, {
      debug: !config.isProduction,
      autotrack: true,
      ignore_dnt: true,
    });
  }
}

export function pageView(pathName) {
  mixpanel.track(Events.page_loaded, {
    [Properties.page_viewed]: pathName,
  });
}

export async function login() {
  mixpanel.people.set({ [User.user_state]: UserState.logged_in }, () => {
    mixpanel.track(Events.login);
  });
}

export function logout() {
  mixpanel.people.set({ [User.user_state]: UserState.logged_out }, () => {
    mixpanel.track(Events.logout, {}, () => {
      mixpanel.reset();
    });
  });
}

export function identify(user: Partial<UserProfile>) {
  if (user.id) {
    mixpanel.identify(user.id);
    mixpanel.people.set(mapUserProperties(user));
  }
}

export function metrics(data) {
  mixpanel.track(Events.metrics, data);
}
