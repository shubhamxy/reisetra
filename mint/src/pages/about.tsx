import {
  Box,
  Container,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React from "react";
import { MainLayout } from "../layouts/MainLayout";
import { AppHeader } from "../ui/Header";
import { Footer } from "../ui/Footer";
import HeroCard from "../ui/HeroCard";
import { config } from "../libs/rock/config";
import { useEffect } from "react";
import { analytics } from "../libs";

const useStyles = makeStyles((theme) => ({
  content: {
    marginBottom: 48,
    display: "flex",
    flexDirection: "column",
    paddingLeft: 48,
    paddingRight: 48,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 16,
      paddingRight: 16,
    },
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

const AboutPage = () => {
  const classes = useStyles();
  return (
    <MainLayout
      classes={{
        left: classes.left,
        right: classes.right,
      }}
      top={
        <HeroCard
          data={{
            title: "About Us",
            description: "We are reisetra",
            backgroundImage: "/images/cover.jpg",
          }}
        />
      }
      header={<AppHeader />}
      footer={<Footer />}
    >
      <>
        <Paper className={classes.content}>
          <Container>
            <Box
              pt={6.4}
              pb={6.4}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="body1">
                Our Exclusive line of furniture is well balanced collection of
                designs ranging from rustic to eclectic, from antique to
                contemporary, well proportioned and durable for today's casual
                chic life styles. It is imbued with style and strength,
                resulting in affordable piece to furnish one's home. {config.name}
                has achieved a remarkable reputation in the manufacturing &
                exporting of premium quality wooden products.
              </Typography>
              <br />
              <Typography variant="body1">
                We have maintained a state of the art manufacturing unit that
                enables the production of flawless products as per the buyer's
                specification. Our workforce is trained to turn all ides in to
                reality. We constantly updates our products as well as the
                skills of workers to keep abreast with the latest in the
                international market.
              </Typography>
              <br />
              <Typography variant="body1">
                {config.name} Emphasizes on Quality, Innovation, Renovation, and most
                importantly customer satisfaction. Our Professionaly qualified
                and dedicated product design team leaves no stone unturned to
                provide you quality products. In addition to this, competitive
                prices, large production capicity, committed business dealings
                and timely deliveries add to our reputation in the international
                market. We believe that we can tackle any order in quality and
                quantity and look forward to receive meaningful business
                quaeries from your side.
              </Typography>
            </Box>
          </Container>
        </Paper>
      </>
    </MainLayout>
  );
};

export default AboutPage;
