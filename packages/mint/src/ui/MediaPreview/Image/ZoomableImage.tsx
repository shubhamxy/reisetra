import React from "react";
import useImageZoom from "../../../libs/use-image-zoom";
import Image from "next/image";
import { makeStyles, Theme } from "@material-ui/core";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    display: "flex",
    position: "relative",
    maxWidth: "100%",
    maxHeight: "100%",
    overflow: "hidden",
  },
  image: {
    objectFit: "contain",
    display: "flex",
    maxWidth: "100%",
    maxHeight: "100%",
    flex: 1,
    borderRadius: 8,
    transition: theme.transitions.create(["width", "opacity"]),
  },
  previewContainer: {
    position: "absolute",
    bottom: 0,
    display: "flex",
    borderRadius: 8,
    [theme.breakpoints.up("sm")]: {
      right: 0,
    },
  },
  previewImage: {
    display: "flex",
    position: "relative",
  },
}));

export function ImageWithZoom({ alt, src, ...rest }) {
  const classes = useStyles();
  const imgHeight = 416;

  const imgWidth = 376;

  const lensHeight = 100;

  const lensWidth = 100;

  const previewLensHeight = 200;

  const {
    moveLens,

    imgDimesions,

    lensDimensions,

    previewLensDimensions,

    previewImgDimensions,

    imgContainerDimesions,

    imgRefCallback,

    meshRefCallback,

    imagePreviewRefCallback,
  } = useImageZoom({
    imgHeight,
    imgWidth,
    lensHeight,
    lensWidth,
    previewLensHeight,
    img: src,
    previewImg: src,
  });
  const [showPreview, setShowPreview] = useState(false);
  return (
    <div className={classes.root} {...rest}>
      <div
        className={classes.container}
        onMouseMove={moveLens}
        // style={{
        //   ...imgContainerDimesions,
        // }}
      >
        <div
          ref={meshRefCallback}
          className="mesh"
          // @ts-ignore
          style={{
            ...lensDimensions,
          }}
        />

        <img
          // style={{...imgDimesions}}
          className={classes.image}
          ref={imgRefCallback}
          alt={alt}
          src={src}
        />
      </div>
      <div
          className={classes.previewContainer}
          style={{
            ...previewLensDimensions,
          }}
        >

          <img
            className={classes.previewImage}
            ref={imagePreviewRefCallback}
            alt={alt}
            src={src}
            style={{
              ...previewImgDimensions,
            }}
          />
        </div>

    </div>
  );
}
