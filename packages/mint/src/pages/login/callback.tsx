import { useRouter } from "next/router";
import { useEffect } from "react";
import { login, useAuthDispatch } from "../../libs";

function Auth0CallbackPage() {
  const { query, replace } = useRouter();
  const dispatch = useAuthDispatch();
  useEffect(() => {
    if (
      query.access_token &&
      query.refresh_token &&
      typeof query.access_token === "string" &&
      typeof query.refresh_token === "string"
    ) {
      dispatch(
        login({
          access_token: query.access_token,
          refresh_token: query.refresh_token,
        })
      );
      replace("/");
    }
  }, [query]);
  return (
    <h1>
      This is the auth callback page, you should be redirected immediately!
    </h1>
  );
}

export default Auth0CallbackPage;
