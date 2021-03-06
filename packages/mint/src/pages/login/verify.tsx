import { useRouter } from "next/router";
import { useEffect } from "react";
import { updateSnackBar, useGlobalDispatch } from "../../libs";
import { emailVerify } from "../../libs/rock/api/auth";

function VerifyCallbackPage() {
  const { query, replace } = useRouter();
  const dispatch = useGlobalDispatch();
  useEffect(() => {
    if (
      query.id &&
      query.token &&
      typeof query.id === "string" &&
      typeof query.token === "string"
    ) {
      emailVerify({id: query.id, token: query.token}).then(result => {
        dispatch(
          updateSnackBar({
            message: "Email Verified",
            type: "success",
            open: true,
          })
        );
      }).catch(error => {
        dispatch(
          updateSnackBar({
            message: "Email Verification Failed",
            type: "error",
            open: true,
          })
        );
      });
      replace("/login");
    }
  }, [query]);
  return (
    <h1>
      This is the auth callback page, you should be redirected immediately!
    </h1>
  );
}

export default VerifyCallbackPage;
