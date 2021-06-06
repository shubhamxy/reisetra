import React, { useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  fade,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
import { useProducts, useReviews } from "../../libs";
import GridList from "../../ui/List/GridList";
import { useRouter } from "next/router";
import { ShoppingCart } from "@material-ui/icons";
import ReviewCard from "./review";

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
  { background: "#906039", color: "#ffffff" },
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
const useGridItemStyles = makeStyles<Theme, { styleIndex: number }>(
  (theme) => ({
    root: ({ styleIndex }) => ({
      display: "flex",
      flex: 1,
      position: "relative",
      flexDirection: "column",
      alignItems: "flex-start",
      cursor: "pointer",
      height: 400,
      mixBlendMode: "normal",
      borderRadius: 8,
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.10)",
      color: fade(styles[styleIndex].color, 0.8),
      background: styles[styleIndex].background,
    }),
    card: {
      margin: 0,
      padding: "30px 30px 19px 24px",
      width: "100%",
      height: "100%",
    },

    title: ({ styleIndex }) => ({
      ...theme.typography.subtitle2,
      display: "-webkit-box",
      overflow: "hidden",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      wordBreak: "break-all",
    }),
    description: ({ styleIndex }) => ({
      ...theme.typography.caption,
      display: "-webkit-box",
      overflow: "hidden",
      WebkitLineClamp: 3,
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
    addToCartContainer: {
      position: "absolute",
      bottom: "24px",
      right: "24px",
    },
    button: {
      transition: "opacity ease-in 0.2s",
    },
    cost: {},
    seeAllText: ({ styleIndex }) => ({
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
      backgroundColor: "#fff",
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
      backgroundSize: "contain",
      height: 0,
      width: "100%",
      paddingTop: "56.25%", // 16:9
      "&:hover": {
        transition:
          "background-image 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      },
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
  const [image, setImage] = useState(0);
  const [addToCartVisible, setAddToCartVisible] = useState(false);
  return (
    <Card className={classes.root} onClick={onClick}>
      <CardMedia
        className={classes.image}
        onMouseEnter={() => setImage(image + 1)}
        onMouseLeave={() => setImage(0)}
        image={images?.[image % images.length]?.url}
        title={title}
      />
      <CardContent
        className={classes.card}
        onMouseEnter={() => setAddToCartVisible(true)}
        onMouseLeave={() => setAddToCartVisible(false)}
      >
        <Typography className={classes.title} variant="h5">
          {title}
        </Typography>
        <Typography className={classes.description} variant="subtitle2">
          {description}
        </Typography>
        <Box display="flex" flex={1}>
          <Box className={classes.costContainer}>
            <Typography
              className={classes.cost}
              children={`₹ ${price}`}
              variant="subtitle2"
            />
          </Box>
          <Box className={classes.addToCartContainer}>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              style={{ opacity: addToCartVisible ? 1 : 0 }}
              className={classes.button}
              startIcon={<ShoppingCart style={{ width: 14, height: 14 }} />}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export function Reviews({id}: {id: string}) {
  const query = useReviews(id);
  const router = useRouter();
  return (
    <GridList
      query={query}
      emptyListCaption="No Reviews Yet"
      renderItem={({ item, index }) => (
        <ReviewCard
          {...item}
          onClick={() => {
            router.push(`/product/${item.id}`);
          }}
          key={item.id}
          styleIndex={index % styles.length}
        />
      )}
    />
  );
}
