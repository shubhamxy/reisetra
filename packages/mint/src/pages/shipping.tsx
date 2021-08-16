/* eslint-disable react/no-unescaped-entities */
import {
  Box,
  Container,
  makeStyles,
  Paper,
} from "@material-ui/core";
import React from "react";
import { MainLayout } from "../layouts/MainLayout";
import { AppHeader } from "../ui/Header";
import { Footer } from "../ui/Footer";
import HeroCard from "../ui/HeroCard";
import ReactMarkdown from 'react-markdown'

const t = {
  title: "Shipping",
  subtitle: "REISETRA ENTERPRISES",
  backgroundImage: "",
};

const useStyles = makeStyles((theme) => ({
  content: {
    display: "flex",
    flexDirection: "column",
    background: theme.palette.background.default,
  },
  left: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  right: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));


const markdown = `
### SHIPPING POLICY

Please allow up to 1-2 weeks processing time particularly for new product and pre-orders. We do our best to process all orders out the door within 4-7 business days of purchase with priority given to express orders. Shipping delivery times may vary and are only estimates given by the carriers in addition to our processing times. 

International orders, particularly, may take 30-40 days once shipped. Shipping is subject to weather delays from source to destination, customs delays, COVID delays and other things out of our control. COVID-19 in particular has negatively impacted supply chains, shipping and processing times. 

reisetra.com has no control over the carriers and attempts to send a shipping notification with tracking information to the email address provided at checkout.
`

const ShippingPage = () => {
  const classes = useStyles();
  return (
    <MainLayout
      classes={{
        left: classes.left,
        right: classes.right,
      }}
      containerProps={{
        maxWidth: "md",
      }}
      top={
        <HeroCard
          data={{
            title: t.title,
            subtitle: t.subtitle,
            backgroundImage: t.backgroundImage,
          }}
        />
      }
      header={<AppHeader />}
      footer={<Footer />}
    >
      <Paper className={classes.content} variant="outlined">
        <Container>
          <Box pt={6.4} pb={6.4} pl={6.4} pr={6.4}>
            <ReactMarkdown children={markdown} />
          </Box>
        </Container>
      </Paper>
    </MainLayout>
  );
};

export default ShippingPage;
