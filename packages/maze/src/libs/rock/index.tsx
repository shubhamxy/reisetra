import * as React from "react";
import { QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { ReactQueryDevtools } from "react-query/devtools";
import { queryClient } from "./api";
import { GlobalProvider } from "./global";
import { useRouteAnalytics } from "./utils";

export function RocksProvider({ children, pageProps }) {
  useRouteAnalytics();
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps?.dehydratedState}>
        <GlobalProvider>{children}</GlobalProvider>
      </Hydrate>
      <ReactQueryDevtools
        initialIsOpen={false}
        position="bottom-left"
        containerElement="span"
      />
    </QueryClientProvider>
  );
}

export * from "./utils";
export * from "./config";
export * from "./api";
export * from "./auth";
export * from "./cart";
export * from "./global";
export * from "./orders";
export * from "./products";
export * from "./stories";
export * from "./transactions";
export * from "./users";
export * from "./theme";
