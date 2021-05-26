import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Box, Card, CardContent, fade, Typography } from "@material-ui/core";
import GridList from "../../ui/List/GridList";
import { useProducts } from "../../libs";

const useGridStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    width: "100%",
    height: "100%",
    rowGap: 8,
    columnGap: 8,
    overflow: "hidden",
    padding: theme.spacing(2.2, 2.2, 1.9, 2.2),
    gridTemplateColumns: "repeat(3, 1fr)",
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
  },
}));
type TStyles =
  {
    background: string,
    color: string,
  }[]
const styles: TStyles = [
  { background: "#906039", color: "#000000" },
  {
    background: "#d3b7a1",
    color: "#fff",
  },
  {
    background: "#d88ea3",
    color: "#fff",
  },
  {
    background: "#286dc1",
    color: "#000000",
  },
];
const useGridItemStyles = makeStyles<Theme, any>((theme) => ({
  root: ({ styleIndex }) => ({
    display: "flex",
    flex: 1,
    position: "relative",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "30px 30px 19px 30px",
    cursor: "pointer",
    width: "275px",
    height: "352px",
    mixBlendMode: "normal",
    boxShadow: "0px 3.79093px 11.3728px rgba(0, 0, 0, 0.103775)",
    borderRadius: "8.52671px",
    background: styles[styleIndex].background,
    backgroundSize: "100%",
    backgroundPosition: "bottom",
    backgroundRepeat: "no-repeat",
    "&:hover": {
      backgroundColor: fade(styles[styleIndex].background, 0.8),
      transition:
        "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    },
  }),
  card: {
    padding: 0,
    margin: 0,
  },
  title: ({ styleIndex }) => ({
    ...theme.typography.caption,
    color: fade(styles[styleIndex].color, 0.8),
    fontSize: "12px",
    lineHeight: "16px",
    display: "-webkit-box",
    overflow: "hidden",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
    wordBreak: "break-all",
  }),
  description: ({ styleIndex }) => ({
    ...theme.typography.body2,
    color: fade(styles[styleIndex].color, 0.8),
    fontSize: "24px",
    lineHeight: "32px",
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    wordBreak: "break-all",
  }),
  banner: {},
  cover: {},
  group: {},
  seeAll: {
    position: "absolute",
    bottom: "24px",
    left: "24px",
  },
  seeAllText: ({ styleIndex }) => ({
    ...theme.typography.body2,
    color: fade(styles[styleIndex].color, 0.8),
    fontSize: "12px",
    lineHeight: "14px",
  }),
  illustration: {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
    top: 0,
    width: "100%",
    height: "100%",
  },
}));

// common responsive css grid variants
export function Grid({ children, ...rest }) {
  const classes = useGridStyles();
  return (
    <Box className={classes.root} {...rest}>
      {children}
    </Box>
  );
}

export function GridItem({
  children,
  styleIndex = 0,
  title,
  description,
  images,
}) {
  const classes = useGridItemStyles({ styleIndex });
  return (
    <Card
      elevation={0}
      className={classes.root}
      style={{ backgroundImage: `url(${images?.[0]?.url})` }}
    >
      <CardContent className={classes.card}>
        <Typography className={classes.title} variant="subtitle2">
          {title}
        </Typography>
        <Typography className={classes.description} variant="body2">
          {description}
        </Typography>
      </CardContent>
      <Box className={classes.seeAll}>
        <Typography
          className={classes.seeAllText}
          children={"See All"}
          variant="caption"
        />
      </Box>
    </Card>
  );
}

export const Categories = () => {
  const query = useProducts();
  return (
    <GridList
      query={query}
      renderItem={({ item, index }) => (
        <GridItem {...item} key={index} styleIndex={index % styles.length}></GridItem>
      )}
    />
  );
};
