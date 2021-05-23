import * as React from "react";
import {
  Box,
  createStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Paper,
  Typography,
  Divider,
} from "@material-ui/core";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
export const NAVIGATION_LINKS = {
  1: [
    {
      key: "home",
      title: "Dashboard",
      iconUrl: "computer.svg",
      link: "/home",
    },
    {
      key: "queries",
      title: "Query portal",
      iconUrl: "query.svg",
      link: "/queries",
    },
    {
      key: "shortlist",
      title: "Shortlists",
      iconUrl: "shortlist.svg",
      link: "/shortlist",
    },
    {
      key: "applications",
      title: "Applications",
      iconUrl: "application.svg",
      link: "/applications",
    },
    {
      key: "discover",
      title: "Discover Colleges",
      iconUrl: "search-program.svg",
      link: "/discover",
    },
    {
      key: "connections",
      title: "Connections",
      iconUrl: "connection.svg",
      link: "/connections",
      disabled: true,
    },
  ],
  2: [
    {
      key: "queries",
      title: "Dashboard",
      iconUrl: "computer.svg",
      link: "/queries",
    },
    {
      key: "alma-mater",
      title: "Alma Mater",
      iconUrl: "alma-mater.svg",
      link: "/alma-mater",
    },
    {
      key: "experiences",
      title: "Experiences",
      iconUrl: "experiences.svg",
      link: "/experiences",
    },
    {
      key: "connections",
      title: "Connections",
      iconUrl: "connection.svg",
      link: "/connections",
      disabled: true,
    },
    {
      key: "z-footprint",
      title: "Z-Footprint",
      iconUrl: "z-footprint.svg",
      link: "/z-footprint",
      disabled: true,
    },
    {
      key: "rewards",
      title: "Reward Book",
      iconUrl: "rewards.svg",
      link: "/rewards",
      disabled: true,
    },
  ],
};
const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      //borderRadius: 12,
      //	boxShadow: " 0px 2px 6px rgba(0, 0, 0, 0.103775)",
    },
    list: {
      borderRadius: 12,
      paddingLeft: 8,
      paddingRight: 8,
    },
    listItem: {
      paddingTop: 20,
      paddingLeft: 12,
      paddingBottom: 20,
      borderRadius: 10,
      "&.MuiListItem-root.Mui-disabled": {
        opacity: 1,
      },
    },
    listItemText: {
      marginTop: 0,
      marginBottom: 0,
      fontSize: "16px",
      lineHeight: "24px",
      color: "#131415",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
    },
    listItemDisabled: {},
    listItemTextSelected: {
      ...theme.typography.body2,
      marginTop: 0,
      marginBottom: 0,
      fontSize: "18px",
      lineHeight: "24px",
      color: "#131415",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
    },
    listItemIcon: {
      width: 20,
      height: 20,
      minWidth: "unset",
      marginRight: 10,
    },
  })
);

export function Menu({ active }) {
  const classes = useStyles();
  const router = useRouter();
  return (
    <>
      <Paper className={classes.paper}>
        <List className={classes.list} component="nav" id="nav">
          {NAVIGATION_LINKS[1].map((item, index, array) => (
            <React.Fragment key={index}>
              <Link passHref href={item.link}>
                <ListItem
                  component="a"
                  selected={item.key === active}
                  className={classes.listItem}
                  classes={{ disabled: classes.listItemDisabled }}
                  disabled={item?.disabled || false}
                  button
                  key={index}
                  children={
                    <React.Fragment key={index}>
                      <ListItemIcon className={classes.listItemIcon}>
                        {!!item.iconUrl ? (
                          <Image
                            width={20}
                            height={20}
                            src={`/images/icons/dashboard/${item.iconUrl}`}
                            alt={item.title}
                          />
                        ) : null}
                      </ListItemIcon>
                      <ListItemText
                        children={
                          <Typography
                            children={item.title}
                            className={
                              item.key === active
                                ? classes.listItemTextSelected
                                : classes.listItemText
                            }
                            variant="body1"
                            component={"p"}
                          />
                        }
                      />

                      {item.disabled ? (
                        <Box
                          style={{
                            backgroundColor: "#009D32",
                            padding: "3px 8px",
                            borderRadius: 50,
                          }}
                        >
                          <Typography
                            style={{
                              fontSize: "10px",
                              lineHeight: "14px",
                              color: "#FFF",
                            }}
                          >
                            Coming soon
                          </Typography>
                        </Box>
                      ) : null}
                    </React.Fragment>
                  }
                />
              </Link>

              {index !== array.length - 1 ? <Divider /> : null}
            </React.Fragment>
          ))}
        </List>
      </Paper>
      <List style={{ marginTop: 20 }}>
        <ListItem disabled component="div">
          <ListItemIcon className={classes.listItemIcon}>
            <Image
              width={20}
              height={20}
              src={`/images/icons/dashboard/getting-started.svg`}
              alt={"Getting Started"}
            />
          </ListItemIcon>
          <ListItemText>Getting Started</ListItemText>
        </ListItem>
        <ListItem disabled component="div">
          <ListItemIcon className={classes.listItemIcon}>
            <Image
              width={20}
              height={20}
              src={`/images/icons/dashboard/help-center.svg`}
              alt={"help center"}
            />
          </ListItemIcon>
          <ListItemText>Help center</ListItemText>
        </ListItem>
      </List>
    </>
  );
}
