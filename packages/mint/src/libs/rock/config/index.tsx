export enum Environment {
  Local = "localhost",
  Development = "development",
  Production = "production",
}

export interface Config {
  isProduction: boolean;
  name: string;
  title: string;
  debug: boolean;
  description: string;
  contactEmail: string;
  appEnv: Environment;
  port: number;
  apiUrl: string;
  clientUrl: string;
  cmsUrl: string;
  authUrl: string;
  cdnUrl: string;
  callbackUrl: string
  googleOAuthOptions: {
    enableGoogleSignIn: boolean;
    clientID: string;
    callbackUrl: string;
  };
  freshchat: {
    enableFreshChat: boolean;
    host: string;
    token: string;
  };
  analytics: {
    enableGTag: boolean;
    gtmId: string;
    gaMeasurementId: string;
    enableMixpanel: boolean;
    enableLogrocket: boolean;
    mixpanelToken: string;
    logrocketToken: string;
  };
  fb: {
    enableFBChatPlugin: boolean;
    fbCustomerChatPageId: string;
    appId: string;
  };
  twitter: {
    handle?: string;
    site?: string;
  };
  socials: {
    instagram: string;
    facebook: string;
    whatsapp: string;
  };
}

export const isBrowser = typeof window !== "undefined";

export const config: Config = {
  // app
  isProduction: process.env.NEXT_PUBLIC_NODE_ENV === "production",
  name: process.env.NEXT_PUBLIC_APP_NAME || "Reisetra",
  title: process.env.NEXT_PUBLIC_APP_TITLE || "Indian Handcrafts",
  description:
    process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
    "Unique products designed by independent artists.",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  appEnv: (process.env.NEXT_PUBLIC_APP_ENV || "production") as Environment,
  debug: +process.env.NEXT_PUBLIC_APP_DEBUG === 1,
  port: +process.env.NEXT_PUBLIC_PORT || 3000,
  clientUrl: process.env.NEXT_PUBLIC_CLIENT_URL || "https://next.reisetra.com",
  cmsUrl: process.env.NEXT_PUBLIC_CMS_CLIENT_URL || "https://cms.reisetra.com",
  callbackUrl:
    process.env.NEXT_PUBLIC_CALLBACK_URL || 'https://next.reisetra.com/login/callback',
  authUrl:
    process.env.NEXT_PUBLIC_AUTH_CLIENT_URL ||
    "https://auth.reisetra.com",
  cdnUrl:
    process.env.NEXT_PUBLIC_CDN_URL || "https://d38bp8dgh2l2dc.cloudfront.net",
  // API
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "",
  // GOOGLE Login
  googleOAuthOptions: {
    enableGoogleSignIn: !!process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID,
    clientID: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID || "",
    callbackUrl: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_CALLBACK_URL || "",
  },
  freshchat: {
    enableFreshChat: !!process.env.NEXT_PUBLIC_FRESHCHAT_TOKEN,
    host: process.env.NEXT_PUBLIC_FRESHCHAT_HOST,
    token: process.env.NEXT_PUBLIC_FRESHCHAT_TOKEN,
  },
  analytics: {
    enableGTag:
      !!process.env.NEXT_PUBLIC_ANALYTICS_GTM_ID &&
      !!process.env.NEXT_PUBLIC_ANALYTICS_GA_MEASUREMENT_ID,
    // ref: https://tagmanager.google.com/#/container/accounts
    gtmId: process.env.NEXT_PUBLIC_ANALYTICS_GTM_ID,
    // ref: https://analytics.google.com/analytics/web/
    gaMeasurementId: process.env.NEXT_PUBLIC_ANALYTICS_GA_MEASUREMENT_ID,
    enableMixpanel: !!process.env.NEXT_PUBLIC_MIXPANEL_TOKEN,
    // ref https://mixpanel.com/report/2463627/view/3006479/live
    mixpanelToken: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN,
    enableLogrocket: !!process.env.NEXT_PUBLIC_LOGROCKET_TOKEN,
    logrocketToken: process.env.NEXT_PUBLIC_LOGROCKET_TOKEN,
  },
  fb: {
    enableFBChatPlugin: !!process.env.NEXT_PUBLIC_FB_CUSTOMER_CHAT_PAGE_ID,
    fbCustomerChatPageId: process.env.NEXT_PUBLIC_FB_CUSTOMER_CHAT_PAGE_ID,
    appId: process.env.NEXT_PUBLIC_FB_APP_ID,
  },
  twitter: {
    handle: process.env.NEXT_PUBLIC_TWITTER_HANDLE,
    site:
      process.env.NEXT_PUBLIC_TWITTER_SITE ||
      process.env.NEXT_PUBLIC_CLIENT_URL,
  },
  socials: {
    facebook:
      process.env.NEXT_PUBLIC_SOCIALS_FACEBOOK || "https://www.facebook.com/",
    instagram:
      process.env.NEXT_PUBLIC_SOCIALS_INSTAGRAM || "https://www.instagram.com/",
    whatsapp:
      process.env.NEXT_PUBLIC_SOCIALS_WHATSAPP ||
      "https://api.whatsapp.com/send?phone=919999999999",
  },
};
