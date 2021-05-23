import { isBrowser } from "../config";
/**
 * @description LocalStorage keys
 */
enum LS_KEY {
  access_token = "@reisetra/access_token",
  refresh_token = "@reisetra/refresh_token",
  user_profile = "@reisetra/user_profile",
};

export const storage = {
  put: {
    access_token: function (access_token: string) {
      if (isBrowser) {
        try {
          window?.sessionStorage?.setItem?.(LS_KEY.access_token, access_token);
          return true;
        } catch (err) {
          console.log("@storage error", err);
          return false;
        }
      }
      return false;
    },
    refresh_token: function (refresh_token: string) {
      if (isBrowser) {
        try {
          window?.localStorage?.setItem?.(LS_KEY.refresh_token, refresh_token);
          return true;
        } catch (err) {
          console.log("@storage error", err);
          return false;
        }
      }
      return false;
    },
    user_profile: function (user_profile: any) {
      if (isBrowser) {
        try {
          window?.sessionStorage?.setItem?.(
            LS_KEY.user_profile,
            JSON.stringify(user_profile)
          );
          return true;
        } catch (err) {
          console.log("@storage error", err);
          return false;
        }
      }
      return false;
    },
  },
  get: {
    access_token: function () {
      if (isBrowser) {
        return window?.sessionStorage.getItem(LS_KEY.access_token);
      }
    },
    refresh_token: function () {
      if (isBrowser) {
        return window?.localStorage.getItem(LS_KEY.refresh_token);
      }
    },
    user_profile: function () {
      if (isBrowser) {
        try {
          const data = window?.sessionStorage?.getItem?.(LS_KEY.user_profile);
          return JSON.parse(data);
        } catch (err) {
          console.log("@storage error", err);
          return null;
        }
      }
      return null;
    },
  },
  remove: {
    access_token: function access_token() {
      if (isBrowser) {
        window?.sessionStorage?.removeItem?.(LS_KEY.access_token);
      }
    },
    refresh_token: function access_token() {
      if (isBrowser) {
        window?.localStorage?.removeItem?.(LS_KEY.refresh_token);
      }
    },
    user_profile: function access_token() {
      if (isBrowser) {
        window?.sessionStorage?.removeItem?.(LS_KEY.user_profile);
      }
    },
  },
  clear: function () {
    if (isBrowser) {
      window?.sessionStorage?.clear();
      window?.localStorage?.clear();
    }
  },
};
