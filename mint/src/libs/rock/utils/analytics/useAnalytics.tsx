import { useRouter } from "next/router";
import { useEffect } from "react";
import { isBrowser } from "../../config";
import { pageView } from "./analytics";

export const useRouteAnalytics = () => {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (isBrowser) {
        pageView(url);
      }
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
};
