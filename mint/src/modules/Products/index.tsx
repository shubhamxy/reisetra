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
import { useInterval, useProducts } from "../../libs";
import GridList from "../../ui/List/GridList";
import { useRouter } from "next/router";
import { ShoppingCart } from "@material-ui/icons";
import { Rating } from "@material-ui/lab";
import Image from 'next/image';

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
const useGridItemStyles = makeStyles<
  Theme,
  { styleIndex: number; colors: string[] }
>((theme) => ({
  root: ({ styleIndex, colors }) => ({
    display: "flex",
    flex: 1,
    position: "relative",
    flexDirection: "column",
    alignItems: "flex-start",
    cursor: "pointer",
    height: 372,
    maxWidth: 320,
    justifyContent: "center",
    mixBlendMode: "normal",
    borderRadius: 8,
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.10)",
    color:
      colors && colors[0] ? colors[0] : fade(styles[styleIndex].color, 0.8),
    background: colors && colors[1] ? colors[1] : styles[styleIndex].background,
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
      height: "unset",
      alignItems: "center",
    },
  }),
  card: {
    margin: 0,
    padding: "20px 24px 20px 24px",
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },

  title: {
    ...theme.typography.subtitle2,
    display: "-webkit-box",
    overflow: "hidden",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    wordBreak: "break-all",
  },
  description: {
    ...theme.typography.caption,
    display: "-webkit-box",
    overflow: "hidden",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    wordBreak: "break-all",
  },
  banner: {},
  cover: {},
  group: {},
  costContainer: {
    display: "flex",
    flexDirection: "column",
    bottom: "24px",
    left: "24px",
  },
  addToCartContainer: {
    bottom: "24px",
    right: "24px",
  },
  button: {
    transition: "opacity ease-in 0.2s",
  },
  cost: {},
  seeAllText: {
    ...theme.typography.body2,
    fontSize: "12px",
    lineHeight: "14px",
  },
  imageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "100%",
  },
  media: {
    position: "relative",
    backgroundColor: "#fff",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundSize: "contain",
    height: 0,
    width: "100%",
    paddingTop: "56.25%", // 16:9
  },
  image: {
    transition: "all ease-in 2s",
  }
}));

export function GridItem({
  styleIndex = 0,
  title,
  description,
  ratingsCount,
  rating,
  price,
  mrp,
  images,
  styles: colors,
  onClick,
  showDescription = false,
}: {
  styleIndex: number;
  title: string;
  description: string;
  rating: number | string;
  ratingsCount: number | string;
  mrp: string;
  price: string;
  images: { url: string }[];
  styles: string[];
  onClick: () => any;
  showDescription: boolean
}) {
  const classes = useGridItemStyles({ styleIndex, colors });
  const [image, setImage] = useState(0);
  const [addToCartVisible, setAddToCartVisible] = useState(false);
  useInterval(
    () => {
      setImage((image + 1) % images.length);
    },
    image > 0 ? 4000 : null
  );
  return (
    <Card className={classes.root} onClick={onClick}>
      <CardMedia
        className={classes.media}
        onMouseEnter={() => setImage(image + 1)}
        onMouseLeave={() => setImage(0)}
        title={title}
      >
        <Image objectFit="contain" className={classes.image}  src={images?.[image % images.length]?.url} layout="fill" />
      </CardMedia>
      <CardContent
        className={classes.card}
        onMouseEnter={() => setAddToCartVisible(true)}
        onMouseLeave={() => setAddToCartVisible(false)}
      >
        <Box display={"flex"} flexDirection="column">
          <Typography className={classes.title} variant="h4" title={title}>
            {title}
          </Typography>
          {description && showDescription && (
            <Typography
              className={classes.description}
              variant="subtitle2"
              title={description}
            >
              {description}
            </Typography>
          )}
        </Box>
        <Box display="flex" flexDirection="column">
          <Box className={classes.costContainer}>
            <Box>
              <Typography
                className={classes.cost}
                children={`₹ ${price}`}
                variant="subtitle2"
              />
            </Box>
            <Box>
              <Typography
                children={`MRP`}
                variant="caption"
                style={{ fontSize: 10 }}
              />
              <Typography
                children={`₹${mrp}`}
                variant="caption"
                style={{
                  fontSize: 10,
                  marginLeft: 4,
                  textDecoration: "line-through",
                }}
              />
              <Typography
                children={`(${(((+mrp - +price) / +mrp) * 100) | 0}% off)`}
                variant="caption"
                style={{ fontSize: 10, marginLeft: 4 }}
              />
            </Box>
            <Box display="flex">
              <Rating size="small" value={+rating || 5} readOnly />
              <Box>
                <Typography
                  children={`(${+ratingsCount || 1} review${
                    +ratingsCount > 0 ? "s" : ""
                  })`}
                  variant="caption"
                  style={{ fontSize: 12, marginLeft: 4 }}
                />
              </Box>
            </Box>
          </Box>
          <Box className={classes.addToCartContainer} mt={1.4}>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              style={{ opacity: addToCartVisible ? 1 : 0.88 }}
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

export function Products({ filters, enabled = true }) {
  const query = useProducts(filters, enabled);
  const router = useRouter();
  return (
    <GridList
      query={query}
      renderItem={({ item, index }) => (
        <GridItem
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
