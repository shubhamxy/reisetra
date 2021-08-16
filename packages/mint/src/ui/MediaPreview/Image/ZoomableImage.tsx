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
    position: "relative",
  },
  container: {
    display: "flex",
    position: "relative",
    maxWidth: "100%",
    maxHeight: "100%",
    overflow: "hidden",
    cursor: "crosshair",
  },
  image: {
    objectFit: "contain",
    display: "flex",
    maxWidth: "100%",
    maxHeight: "100%",
    flex: 1,
    transition: theme.transitions.create(["width", "height", "opacity"]),
  },
  previewContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",

    top: 0,
    left: "106%",
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      top: "106%",
      left: "unset",
    },
    transition: theme.transitions.create(["width", "height", "opacity"]),
  },
  previewImage: {
    display: "flex",
    position: "relative",
  },
}));

export function ImageWithZoom({ alt, src, ...rest }) {
  const imgHeight = 320;

  const imgWidth = 460;

  const lensHeight = 50;

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
  const classes = useStyles();

  return (
    <div className={classes.root} {...rest}>
      <div
        className={classes.container}
        onMouseMove={moveLens}
        // style={{
        //   ...imgContainerDimesions,
        // }}
        onMouseEnter={() => setShowPreview(true)}
        onMouseLeave={() => setShowPreview(false)}
      >
        <div
          ref={meshRefCallback}
          className="mesh"
          // @ts-ignore
          style={{
            ...lensDimensions,
            ...(!showPreview ? { opacity: 0 } : {}),
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
          opacity: showPreview ? 1 : 0,
          zIndex: showPreview ? 100 : -100,
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
