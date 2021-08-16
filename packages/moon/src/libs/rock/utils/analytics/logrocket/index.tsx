import LogRocket from "logrocket";
import { UserProfile } from "../../../api/user";
import { config, isBrowser } from "../../../config";
import { Events, Properties, mapUserProperties, UserState } from "../types";

export async function initialize() {
  LogRocket.init(config.analytics.logrocketToken);
}

export async function identify(user: Partial<UserProfile>) {
  if (user.id) {
    LogRocket.identify(user.id, mapUserProperties(user));
  }
}

export async function pageView(pathName: string) {
  LogRocket.track(Events.page_loaded, {
    [Properties.page_viewed]: pathName,
  });
}

export async function login() {
  LogRocket.track(Events.login, {});
}

export async function logout() {
  LogRocket.track(Events.logout, {});
}

export async function metrics(data) {
  LogRocket.track(Events.metrics, data);
}
