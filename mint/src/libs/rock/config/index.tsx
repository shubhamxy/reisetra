export enum Environment {
  Local = "localhost",
  Development = "development",
  Production = "production"
}

export interface Config {
  isProduction: boolean;
  name: string;
  debug: boolean;
  description: string;
  contactEmail: string;
  appEnv: Environment;
  port: number;
  apiUrl: string;
  clientUrl: string;
  googleOAuthOptions: {
    clientID: string;
    callbackUrl: string;
  };
}

export const isBrowser = typeof window !== undefined;

export const config: Config = {
  // app
  isProduction: process.env.NEXT_PUBLIC_NODE_ENV === "production",
  name: process.env.NEXT_PUBLIC_APP_NAME || "",
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || "",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  appEnv: (process.env.NEXT_PUBLIC_APP_ENV || "production") as Environment,
  debug: +process.env.NEXT_PUBLIC_APP_DEBUG === 1,
  port: +process.env.NEXT_PUBLIC_PORT || 3000,
  clientUrl: process.env.NEXT_PUBLIC_CLIENT_URL || '',

  // API
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "",

  // GOOGLE Login
  googleOAuthOptions: {
    clientID: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID || '',
    callbackUrl: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_CALLBACK_URL || '',
  },
};
