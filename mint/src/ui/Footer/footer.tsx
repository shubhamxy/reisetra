import React, { Component } from "react";
import Link from "next/link";
import { footerLinks } from "./data";
import { Icons, Image } from "../Image";

import {
  Container,
  List,
  ListItem,
  Typography,
  createStyles,
  fade,
  Grid,
  Paper,
  makeStyles,
  Theme,
  Box,
} from "@material-ui/core";
import { config } from "../../libs";
import { Logo } from "../Logo";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      display: "flex",
      width: "100%",
      background: theme.palette.background.paper,
      position: "relative",
      [theme.breakpoints.down("sm")]: {
        padding: "40px 0 0",
      },
      boxShadow: "0 -2px 8px rgb(0 0 0 / 15%)",
    },
    container: {
      display: "flex",
      flexDirection: "row",
      padding: "40px 30px 40px 30px",
    },
    content: {
      display: "flex",
      flexDirection: "row",
      height: "100%",
    },
    left: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      height: "100%",
    },
    right: {
      display: "flex",
      flex: 1,
      height: "100%",
      width: "100%",
      justifyContent: "space-around",
      alignItems: 'flex-start',
      textAlign: 'left'
    },
    footerNav: {
      paddingLeft: 24,
    },
    footerNavTitle: {
    },
    footerNavList: {},
    footerListItem: {
      cursor: 'pointer',
    },
    payments: {
      borderRadius: "4px",
      display: "flex",
      padding: "20px 0px",
    },
  })
);

function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Container className={classes.container}>
        <Grid container className={classes.content}>
          <Box className={classes.left}>
            <Box display="flex" flex={1}>
              <Logo />
            </Box>
            <Box display="flex" flex={1} maxWidth={"400px"}>
              <Typography variant="caption">
                {config.name} has achieved a remarkable reputation in the manufacturing & exporting of premium quality wooden products and we are here to satisfy your design needs.</Typography>
            </Box>
            <Box className={classes.payments}>
              <Image
                objectFit={"contain"}
                height={60}
                width={320}
                icon={Icons.payments}
                alt="Payments"
              />
            </Box>
            <Box>
            <Typography color="textPrimary"  variant="caption">
              &copy; 2021 {config.name}.
            </Typography>

            </Box>
          </Box>

          <Box className={classes.right}>
            {footerLinks.map((item, index) => {
              return (
                <Box className={classes.footerNav} key={index}>
                  <Typography color="textPrimary" variant="h6" className={classes.footerNavTitle}>
                    {item.headerTitle}
                  </Typography>
                  <List className={classes.footerNavList}>
                    {item.nav.map((ele, indx) => {
                      return (
                        <ListItem
                          key={indx}
                          className={classes.footerListItem}
                          disableGutters
                        >
                          <Link href={ele.to}>
                            <Typography align="left" variant="caption">
                              {ele.title}
                            </Typography>
                          </Link>
                        </ListItem>
                      );
                    })}
                  </List>
                </Box>
              );
            })}
          </Box>
        </Grid>
      </Container>
    </footer>
  );
}

export default Footer;
