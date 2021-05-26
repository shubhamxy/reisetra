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
import { useRouter } from "next/router";

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
    background: "#74D125",
    color: "#000000",
  },
  {
    background: "#286dc1",
    color: "#000000",
  },
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

const useGridItemStyles = makeStyles<Theme, { styleIndex: number }>(
  (theme) => ({
    root: ({ styleIndex }) => ({
      display: "flex",
      flex: 1,
      position: "relative",
      flexDirection: "column",
      alignItems: "flex-start",
      cursor: "pointer",
      mixBlendMode: "normal",
      borderRadius: 8,
      height: 354,
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.103775)",
      color: fade(styles[styleIndex].color, 0.8),
      background: styles[styleIndex].background,
      "&:hover": {
        backgroundColor: fade(styles[styleIndex].background, 0.8),
        transition:
          "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      },
    }),
    card: {
      margin: 0,
      padding: "20px 20px 10px 20px",
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
    title: ({}) => ({
      ...theme.typography.subtitle2,
      display: "-webkit-box",
      overflow: "hidden",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      wordBreak: "break-all",
    }),
    description: ({}) => ({
      ...theme.typography.caption,
      display: "-webkit-box",
      overflow: "hidden",
      WebkitLineClamp: 2,
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
    seeAllText: ({}) => ({
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
  styleIndex = 0,
  title,
  description,
  price,
  images,
  onClick,
}: {
  styleIndex: number;
  title: string;
  description: string;
  price: string;
  images: { url: string }[];
  onClick: () => any;
}) {
  const classes = useGridItemStyles({ styleIndex });
  return (
    <Card elevation={0} className={classes.root} onClick={onClick}>
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
            children={`₹ ${price}`}
            variant="subtitle2"
          />
        </Box>
      </CardContent>
    </Card>
  );
}

export function Products() {
  const products = useProducts();
  const router = useRouter();
  return (
    <GridList
      query={products}
      renderItem={({ item, index }) => {
        return (
          <GridItem
            {...item}
            onClick={() => {
              router.push(`product/${item.id}`);
            }}
            key={item.id}
            styleIndex={index % styles.length}
          />
        );
      }}
    />
  );
}
