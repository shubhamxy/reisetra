import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { RocksProvider } from "../libs";

import "nprogress/nprogress.css";
import "../assets/styles/main.css";

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
