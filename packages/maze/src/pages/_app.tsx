import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import Head from "next/head";
import Router from "next/router";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { RocksProvider } from "../libs";
import { config } from "../libs/rock/config";
import "nprogress/nprogress.css";
import "../assets/styles/main.css";
import { analytics } from "../libs/rock/utils";
import { DefaultSeo } from "next-seo";
analytics.initialize();
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
      <DefaultSeo
        title={config.title + " - " + config.name}
        description={config.description}
        twitter={{
          handle: "@shubhamxy",
          site: "@shubhamxy",
          cardType: "summary_large_image",
        }}
        openGraph={{
          type: "website",
          locale: "en_IE",
          url: config.clientUrl,
          title: config.title + " - " + config.name,
          description: config.description,
          images: [
            {
              url:
                "https://raw-soda.s3.ap-south-1.amazonaws.com/ckqcmj00j00022qp8cqw5v390/images/aR42QoNn66FRM8PJbrfC2.jpg",
              width: 800,
              height: 600,
              alt: config.title,
            },
          ],
          site_name: config.name,
        }}
      />
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
