import LogRocket from "logrocket";
import { UserProfile } from "../../../api/user";
import { config, isBrowser } from "../../../config";
import { mapUserProperties } from "../types";

export function initialize() {
  if (isBrowser && !!config.analytics.logrocketToken) {
    LogRocket.init(config.analytics.logrocketToken);
  }
}

export function identify(user: Partial<UserProfile>) {
  if (isBrowser && !!config.analytics.logrocketToken && user.id) {
    LogRocket.identify(user.id, mapUserProperties(user));
  }
}
