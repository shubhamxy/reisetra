import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import createEmotionServer from "@emotion/server/create-instance";
import { Theme } from "@material-ui/core";
import { ServerStyleSheets } from "@material-ui/styles";
import Document, { Head, Html, Main, NextScript } from "next/document";
import * as React from "react";
import { config, WithTheme } from "../libs";

const getCache = () => {
  const cache = createCache({ key: "css", prepend: true });
  cache.compat = true;

  return cache;
};

export default class MyDocument extends Document {
  render() {
    return (
      <WithTheme>
        {(theme: Theme) => (
          <Html lang="en">
            <Head>
              {/* PWA primary color */}
              <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/static/apple-touch-icon.png"
              />
              <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/static/favicon-32x32.png"
              />
              <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/static/favicon-16x16.png"
              />
              <link
                rel="mask-icon"
                href="/static/safari-pinned-tab.svg"
                color={theme.palette.primary.main}
              />
              <meta name="apple-mobile-web-app-title" content={config.name} />
              <meta name="application-name" content={config.name} />
              <meta name="msapplication-TileColor" content={theme.palette.primary.main} />
              <meta name="theme-color" content={theme.palette.primary.main} />

              <link rel="apple-touch-icon" href="/static/logo.png" />
              <link rel="manifest" href="/static/manifest.json" />
              {/* Google Login Script */}
              <script
                src="https://accounts.google.com/gsi/client"
                async
                defer
              />

            </Head>
            <body>
              <Main />
              <NextScript />
            </body>
          </Html>
        )}
      </WithTheme>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  const cache = getCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      // Take precedence over the CacheProvider in our custom _app.js
      enhanceComponent: (Component) => (props) => (
        <CacheProvider value={cache}>
          <Component {...props} />
        </CacheProvider>
      ),
    });

  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
      ...emotionStyleTags,
    ],
  };
};
