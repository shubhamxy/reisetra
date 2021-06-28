import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import Head from "next/head";
import Router from "next/router";
import NProgress from "nprogress";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { RocksProvider } from "../libs";
import { config } from "../libs/rock/config";
import "nprogress/nprogress.css";
import "../assets/styles/main.css";
import { analytics } from "../libs/rock/utils";
analytics.initialize();

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

// export function reportWebVitals(metrics) {
// 		analytics.metrics(metrics);
// }

export const cache = createCache({ key: "css", prepend: true });
export default function MyApp(props: { Component: any; pageProps: any }) {
  const { Component, pageProps } = props;
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <CacheProvider value={cache}>
      <Head>
        <title>
          {config.name} | {config.description}
        </title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <RocksProvider pageProps={pageProps}>
        <Component {...pageProps} />
      </RocksProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
