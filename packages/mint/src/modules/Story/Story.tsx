import React, { useEffect, useRef, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { Container } from "@material-ui/core";
import ReactMarkdown from 'react-markdown'
import { NextSeo } from "next-seo";
import { config } from "../../libs";
import { useRouter } from "next/router";

export function Story({ data, isLoading }) {
  const {asPath} = useRouter();
  if (!data) {
    return null;
  }
  return (
    <Container maxWidth="md">
      <NextSeo
        description={data.description}
        openGraph={{
          type: "website",
          locale: "en_IE",
          url: asPath,
          title: data.title + " - " + config.name,
          description: config.description,
          images: [
            {
              url: data.images?.[0]?.url || '/images/fallback.jpg',
              width: 800,
              height: 600,
              alt: config.title,
            },
          ],
          site_name: config.name,
        }}
      />
      <ReactMarkdown children={data?.body?.markdown} />
    </Container>
  );
}
