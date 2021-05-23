export enum Environment {
  Local = "localhost",
  Development = "development",
  Production = "production"
}

export interface Config {
  isProduction: boolean;
  name: string;
  description: string;
  contactEmail: string;
  appEnv: Environment;
  port: number;
  apiUrl: string;
  clientUrl: string;
  googleOAuthOptions: {
    clientID: string;
    callbackURL: string;
  };
}

export const isBrowser = typeof window !== undefined;

export const config: Config = {
  // Common
  isProduction: process.env.NODE_ENV === "production",
  name: process.env.APP_NAME || "Reisetra",
  description: process.env.APP_DESCRIPTION || "Authentic Indian Handcrafts",
  contactEmail: "contact@reisetra.com",
  appEnv: (process.env.APP_ENV || "production") as Environment,
  port: +process.env.PORT || 3000,
  clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',

  // API
  apiUrl: process.env.API_URL || "http://localhost:8080/api/v1/",

  // GOOGLE Login
  googleOAuthOptions: {
    clientID: '583554562558-6stke69s8nsc3lca6beajdu4ergs2msh.apps.googleusercontent.com',
    callbackURL: 'auth/login/oauth/google/verify',
  },
};
