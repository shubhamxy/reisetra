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
  IconButton,
  Theme,
  Box,
  useTheme,
} from "@material-ui/core";
import { config } from "../../libs";
import { Logo } from "../Logo";
import {
  Facebook,
  Instagram,
  NightsStay,
  WhatsApp,
  WbSunny,
} from "@material-ui/icons";
import { ButtonGroup } from "@material-ui/core";
import { Button } from "@material-ui/core";
const { version } = require("../../../package.json");

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      display: "flex",
      width: "100%",
      backgroundColor: fade(theme.palette.background.paper, 0.4),
      backdropFilter: "blur(50px)",
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
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        padding: "24px 24px 24px 24px",
      },
    },
    content: {
      display: "flex",
      flexDirection: "row",
      height: "100%",
      width: "100%",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column-reverse",
      },
    },
    info: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      height: "100%",
    },
    links: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      position: "relative",
    },
    footerlinks: {
      display: "flex",
      height: "100%",
      width: "100%",
      justifyContent: "space-between",
      alignItems: "flex-start",
      alignContent: "center",
      textAlign: "left",
    },
    footerNav: {
      paddingRight: 24,
      "&:nth-child(1)": {
        paddingLeft: 0,
      },
      "&:last-child": {
        paddingRight: 0,
      },
    },
    footerNavTitle: {
      fontSize: 18,
    },
    footerNavList: {},
    footerListItem: {
      cursor: "pointer",
    },
    payments: {
      borderRadius: "4px",
      display: "flex",
      padding: "20px 0px",
      marginLeft: "-8px",
    },
    socials: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    socialsicon: {
      borderRadius: 0,
      "&:hover": {
        borderRadius: 0,
      },
      "&:focus": {
        borderRadius: 0,
      },
    },
  })
);

function Footer() {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <footer className={classes.footer}>
      <Container className={classes.container}>
        <Box className={classes.content}>
          <Box className={classes.info}>
            <Box display="flex" flex={1}>
              <Logo />
            </Box>
            <Box display="flex" flex={1} maxWidth={"400px"}>
              <Typography variant="caption">
                {config.name} has achieved a remarkable reputation in the
                manufacturing & exporting of premium quality wooden products and
                we are here to satisfy your design needs.
              </Typography>
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
              <Typography color="textPrimary" variant="caption" title={`Copyright ${config.name} ${version}`}>
                &copy; 2021 {config.name}.
              </Typography>
            </Box>
          </Box>
          <Box className={classes.links}>
            <Box className={classes.footerlinks}>
              {footerLinks.map((item, index) => {
                return (
                  <Box className={classes.footerNav} key={index}>
                    <Typography
                      color="textPrimary"
                      variant="subtitle2"
                      className={classes.footerNavTitle}
                    >
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
            <Box display="flex" alignItems="center" justifyContent="flex-end">
              <Box
                display="flex"
                alignItems="center"
                pr={2.4}
                justifyContent="center"
              >
                <Typography color="textPrimary" variant="caption">
                  Follow Us
                </Typography>
              </Box>
              <ButtonGroup className={classes.socials} variant="outlined">
                <IconButton
                  target="_blank"
                  title="Reisetra facebook"
                  href={config.socials.facebook}
                  disableRipple
                  disableFocusRipple
                  disableTouchRipple
                  className={classes.socialsicon}
                >
                  <Facebook />
                </IconButton>
                <IconButton
                  target="_blank"
                  title="Reisetra instagram"
                  href={config.socials.instagram}
                  disableRipple
                  disableFocusRipple
                  disableTouchRipple
                  className={classes.socialsicon}
                >
                  <Instagram />
                </IconButton>
                <IconButton
                  target="_blank"
                  title="Reisetra whatsapp"
                  href={config.socials.whatsapp}
                  disableRipple
                  disableFocusRipple
                  disableTouchRipple
                  className={classes.socialsicon}
                >
                  <WhatsApp />
                </IconButton>
              </ButtonGroup>
            </Box>
          </Box>
        </Box>
      </Container>
      <Box
        position="absolute"
        style={{ bottom: 0, right: 0, zIndex: 1000, padding: 12 }}
      >
        <IconButton
          title="Enable / Disable dark mode"
          id="dark_mode_button"
          style={{
            backgroundColor: theme.palette.background.paper,
          }}
        >
          {theme.palette.type !== "dark" ? (
            <NightsStay style={{ height: 20, width: 20 }} />
          ) : (
            <WbSunny style={{ height: 20, width: 20 }} />
          )}
        </IconButton>
      </Box>
    </footer>
  );
}

export default Footer;
