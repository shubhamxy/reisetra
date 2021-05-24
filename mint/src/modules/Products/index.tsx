import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  fade,
  Typography,
} from "@material-ui/core";
import { useProducts } from "../../libs";
import GridList from "../../ui/List/GridList";

type ColorsT = {
  [key: string]: {
    background: string;
    color: string;
  };
};

const colors: ColorsT = {
  default: {
    background: "#ffffff",
    color: "#000000",
  },
  dark: {
    background: "#000000",
    color: "#ffffff",
  },
  primary: {
    background: "#74D125",
    color: "#000000",
  },
  secondary: {
    background: "#286dc1",
    color: "#000000",
  },
};
const useGridItemStyles = makeStyles<Theme, { variant: keyof ColorsT }>(
  (theme) => ({
    root: ({ variant }) => ({
      display: "flex",
      flex: 1,
      position: "relative",
      flexDirection: "column",
      alignItems: "flex-start",
      cursor: "pointer",
      mixBlendMode: "normal",
      borderRadius: "8.52671px",
      boxShadow: "0px 3.79093px 11.3728px rgba(0, 0, 0, 0.103775)",
      color: fade(colors[variant].color, 0.8),
      background: colors[variant].background,
      "&:hover": {
        backgroundColor: fade(colors[variant].background, 0.8),
        transition:
          "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      },
    }),
    card: {
      margin: 0,
      padding: "30px 30px 19px 24px",
      width: "100%",
      height: 120,
    },
    primary: {
      background: "#74D125",
      "&:hover": {
        backgroundColor: "#74D125",
        opacity: 0.9,
        transition:
          "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      },
    },
    dark: {
      background: "#1A1A1A",
      "&:hover": {
        backgroundColor: "#222222",
        opacity: 0.9,
        transition:
          "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      },
    },
    title: ({ variant }) => ({
      ...theme.typography.caption,
      lineHeight: "16px",
    }),
    description: ({ variant }) => ({
      ...theme.typography.body2,
      lineHeight: "32px",
      display: "-webkit-box",
      overflow: "hidden",
      WebkitLineClamp: 1,
      WebkitBoxOrient: "vertical",
      wordBreak: "break-all",
    }),
    banner: {},
    cover: {},
    group: {},
    costContainer: {
      position: "absolute",
      bottom: "24px",
      left: "24px",
    },
    cost: {},
    seeAllText: ({ variant }) => ({
      ...theme.typography.body2,
      fontSize: "12px",
      lineHeight: "14px",
    }),
    imageContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      width: "100%",
      height: "100%",
    },
    image: {
      height: 0,
      width: "100%",
      paddingTop: "56.25%", // 16:9
    },
  })
);

export function GridItem({
  variant = "default",
  title,
  description,
  price,
  images,
}: {
  variant: "default" | "dark" | "primary";
  title: string;
  description: string;
  price: string;
  images: { url: string }[];
}) {
  const classes = useGridItemStyles({ variant });
  return (
    <Card elevation={0} className={classes.root}>
      <CardMedia
        className={classes.image}
        image={images?.[0]?.url}
        title="Paella dish"
      />
      <CardContent className={classes.card}>
        <Typography className={classes.title} variant="h5">
          {title}
        </Typography>
        <Typography className={classes.description} variant="subtitle2">
          {description}
        </Typography>
        <Box className={classes.costContainer}>
          <Typography
            className={classes.cost}
            children={price}
            variant="subtitle2"
          />
        </Box>
      </CardContent>
    </Card>
  );
}

export function Products() {
  const products = useProducts();
  return (
    <GridList
      query={products}
      renderItem={({ item, index }) => {
        return (
          <GridItem
            {...item}
            key={item.id}
            variant={Object.keys(colors)[index % 4]}
          />
        );
      }}
    />
  );
}
