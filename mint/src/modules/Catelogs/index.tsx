import React, { useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Box, Card, CardContent, fade, Typography } from "@material-ui/core";
import GridList from "../../ui/List/GridList";
import { useInterval, useProducts } from "../../libs";

type TStyles = {
  background: string;
  color: string;
}[];

const styles: TStyles = [
  {
    background: "#ffffff",
    color: "#000000",
  },
  {
    background: "#000000",
    color: "#ffffff",
  },
  {
    background: "#906039",
    color: "#ffffff",
  },
  {
    background: "#d3b7a1",
    color: "#ffffff",
  },
  {
    background: "#d88ea3",
    color: "#ffffff",
  },
  {
    background: "#286dc1",
    color: "#000000",
  },
  {
    background: "#74D125",
    color: "#000000",
  },
];
const useGridItemStyles = makeStyles<Theme, any>((theme) => ({
  root: ({ styleIndex, colors }) => ({
    display: "flex",
    flex: 1,
    position: "relative",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "30px 30px 19px 30px",
    cursor: "pointer",
    maxWidth: 275,
    height: 352,
    mixBlendMode: "normal",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.103775)",
    borderRadius: 8,
    color: colors && colors[0] ? colors[0] : styles[styleIndex].color,
    background: colors && colors[1] ? colors[1] : styles[styleIndex].background,
    backgroundSize: "contain",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    "&:hover": {
      transition:
        "background-image 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    },
    [theme.breakpoints.down("sm")]: {
      width: '100%',
      margin: "0 auto",
    }
  }),
  card: {
    padding: 0,
    margin: 0,
  },
  title: {
    ...theme.typography.caption,
    fontSize: "12px",
    lineHeight: "16px",
    display: "-webkit-box",
    overflow: "hidden",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
    wordBreak: "break-all",
  },
  description: {
    ...theme.typography.body2,
    fontSize: "18px",
    lineHeight: "32px",
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    wordBreak: "break-all",
  },
  banner: {},
  cover: {},
  group: {},
  seeAll: {
    position: "absolute",
    bottom: "24px",
    left: "24px",
  },
  seeAllText: ({}) => ({
    ...theme.typography.body2,
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

export function GridItem({
  children,
  styleIndex = 0,
  title,
  description,
  styles: colors,
  images,
}) {
  const classes = useGridItemStyles({ styleIndex, colors });
  const [image, setImage] = useState(images.length - 1);
  useInterval(
    () => {
      setImage((image + 1) % images.length);
    },
    image > 0 ? 2000 : null
  );
  return (
    <Card
      elevation={0}
      className={classes.root}
      onMouseEnter={() => setImage((image + 1) % images.length)}
      onMouseLeave={() => setImage(0)}
      style={{ backgroundImage: `url(${images?.[image]?.url})` }}
    >
      <CardContent className={classes.card}>
        <Typography className={classes.title} variant="subtitle2">
          {title}
        </Typography>
        {/* <Typography className={classes.description} variant="body2">
          {description}
        </Typography> */}
      </CardContent>
      <Box className={classes.seeAll}>
        <Typography
          className={classes.seeAllText}
          children={"View"}
          variant="caption"
        />
      </Box>
    </Card>
  );
}

export const Catelogs = ({ filters }) => {
  const query = useProducts(filters);
  return (
    <GridList
      query={query}
      renderItem={({ item, index }) => (
        <GridItem {...item} key={index} styleIndex={item.style || 0}></GridItem>
      )}
    />
  );
};
