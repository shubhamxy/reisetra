import {
  Avatar,
  Box,
  Chip,
  createStyles,
  Divider,
  fade,
  List,
  ListItem,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import * as React from "react";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      backgroundColor: "#d3b7a1",
      padding: "24px 32px 24px 32px",
    },
    badge: {
      top: "-10px !important",
    },
    percentage: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      fontSize: 21,
      lineHeight: 21,
      fontWeight: 700,
      right: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    list: {
      marginTop: 6,
      borderRadius: 6,
      padding: 0,
    },
    listItem: {
      marginTop: 5,
      paddingLeft: 0,
      paddingRight: 0,
      alignItems: "flex-start",
    },
    taglist: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
    },
    taglistitem: {
      background: "#e1dbd7",
      borderRadius: "48px",
      justifyContent: "center",
      alignItems: "center",
      boxShadow: "0px -28px 100px rgba(0, 0, 0, 0.0666248)",
      marginRight: "8px",
      marginBottom: "8px",
      "&:hover": {
        backgroundColor: "#e1dbd7",
      },
      "&:focus": {
        backgroundColor: "#e1dbd7",
        boxShadow: `0px 0px 0px 4px#d0f20f33`,
      },
    },
    listPrimaryText: {},
    action: {
      top: "35%",
      padding: "1px 6px 1px 6px",
      borderRadius: 9,
      fontSize: 12,
      backgroundColor: fade("#011632", 0.05),
    },
  })
);

export default function RecommendedCategories() {
  const classes = useStyles();
  const data = [
    {
      title: "Wall Art",
    },
    {
      title: "Gifts",
    },
    {
      title: "Stationary",
    },
    {
      title: "Stickers",
    },
    {
      title: "Home Decor",
    },
    {
      title: "Furniture",
    },
  ];
  return (
    <Paper className={classes.root}>
      <Box
        display={"flex"}
        flexDirection="column"
        alignItems={"flex-start"}
        pb={2.6}
      >
        <Box pt={0.6} pb={0.6}>
          <Typography variant={"h5"} style={{ color: "#fff" }}>
            Popular Categories
          </Typography>
        </Box>

        <Typography
          variant={"subtitle2"}
          style={{ color: "#ffffff", maxWidth: "90%", opacity: 0.6 }}
        >
          Some recommended catergories we think you may like
        </Typography>
      </Box>
      <Box display={"flex"} flexDirection={"column"}>
        <List
          classes={{
            root: classes.taglist,
          }}
          disablePadding
        >
          {data.map((item, index) => (
            <Chip
              onClick={(e) => {}}
              key={index}
              className={classes.taglistitem}
              label={
                <Typography
                  style={{ fontSize: 14, color: "#2E2F2F" }}
                  variant="subtitle2"
                >
                  {item.title}
                </Typography>
              }
            />
          ))}
        </List>
      </Box>
    </Paper>
  );
}
