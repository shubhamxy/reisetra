import { config, isBrowser } from "../../config";

export function GoogleSignInScript() {
  /* Google Login Script */
  return config.googleOAuthOptions.enableGoogleSignIn ? (
    <script
      src="https://accounts.google.com/gsi/client"
      async
    />
  ) : null;
}
