import React from "react";
import { Box, Typography } from "@material-ui/core";
import { useStyles } from "./styles";
import Image from "next/image";
import { useRouter } from "next/router";
import { Rating } from "@material-ui/lab";

function useHelper({ id }) {
  const router = useRouter();
  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/product/${id}?ref=${encodeURIComponent(router.asPath)}`);
  }
  return {
    handleClick,
  };
}

export function ProductCard({ data }) {
  const {
    id,
    title,
    description,
    rating,
    ratingsCount,
    price,
    mrp,
    images,
  } = data;
  const { handleClick } = useHelper({
    id,
  });

  const classes = useStyles();
  return (
    <Box className={classes.root} onClick={handleClick}>
      <Box className={classes.cover}>
        <Box
          borderRadius="12px"
          overflow="hidden"
          display="flex"
          justifyContent="center"
          alignItems="center"
          bgcolor="#F0F3F6"
          width="62px"
          height="62px"
        >
          {images?.length > 0 ? (
            <img
              src={images[0].url}
              alt={""}
              height={62}
              className={classes.img}
            />
          ) : (
            <Image src="/icons/file.svg" width={24} height={24} />
          )}
        </Box>
      </Box>
      <Box className={classes.content} ml={1.2}>
        <Typography
          className={classes.contentText}
          variant="body1"
          color="textPrimary"
          component="p"
        >
          {title}
        </Typography>
        <Box display="flex" flexDirection="column">
          {/* <Typography
            className={classes.subText}
            variant="body1"
            color="textPrimary"
            component="span"
          >
            {description}
          </Typography> */}
          <Box className={classes.costContainer}>
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
         </Box>
        </Box>
      </Box>
    </Box>
  );
}
