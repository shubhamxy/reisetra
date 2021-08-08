import React, { useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Box, Card, CardContent, fade, Typography } from "@material-ui/core";
import GridList from "../../ui/List/GridList";
import { useInterval, useProducts, useTags } from "../../libs";
import { useRouter } from "next/router";
import Image from "next/image";

type TStyles = {
  background: string;
  color: string;
}[];

const colors: TStyles = [
  {
    background: "#0f0f0f",
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
    color: "#ffffff",
  },
  {
    background: "#74D125",
    color: "#ffffff",
  },
];
const useGridItemStyles = makeStyles<Theme, any>((theme) => ({
  root: ({ colorIndex, styles }) => ({
    display: "flex",
    flex: 1,
    position: "relative",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "30px 16px 30px 16px",
    cursor: "pointer",
    height: 372,
    maxWidth: 320,
    mixBlendMode: "normal",
    color: styles && styles[0] ? styles[0] : colors[colorIndex].color,
    background: styles && styles[1] ? styles[1] : colors[colorIndex].background,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      margin: "0 auto",
    },
    borderRadius: 4,
    border: `1px solid ${theme.palette.text.primary}33`,
    "&:hover": {
      transition:
      "background 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      boxShadow: "0px 4px 12px rgba(15, 15, 15, 0.2)",
    }
  }),

  titleContainer: {
    padding: "14px",
    paddingTop: "2px",
    paddingBottom: "2px",
    background: "#0f0f0f10",
    backdropFilter: "blur(4px)",
    borderRadius: "6px",
    width: "auto",
  },
  title: {
    ...theme.typography.caption,
    display: "-webkit-box",
    overflow: "hidden",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
    wordBreak: "break-all",
  },
  card: {
    margin: 0,
    display: "flex",
    flexDirection: "column",
    marginTop: 24,
    background: "#0f0f0f10",
    backdropFilter: "blur(4px)",
    borderRadius: "6px",
    padding: "14px",
    paddingTop: "2px",
    paddingBottom: "2px",
  },
  descriptionContainer: {},
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
    left: "16px",
    padding: "14px",
    paddingTop: "2px",
    paddingBottom: "2px",
    background: "#0f0f0f10",
    backdropFilter: "blur(4px)",
    borderRadius: "6px",
  },
  image: {
    transition: "all ease-in 2s",
  },
}));

export function GridItem({
  children,
  colorIndex = 0,
  title,
  description,
  styles,
  images,
  onClick,
}) {
  const classes = useGridItemStyles({ colorIndex, styles });
  const [image, setImage] = useState(0);
  useInterval(
    () => {
      setImage((image + 1) % images?.length);
    },
    image > 0 && images.length > 0 ? 2000 : null
  );
  return (
    <Card
      elevation={0}
      className={classes.root}
      onMouseEnter={() =>
        images?.length > 0 ? setImage((image + 1) % images.length) : ""
      }
      onMouseLeave={() => setImage(0)}
      onClick={onClick}
    >
      <Image
        objectPosition="center"
        objectFit={styles && styles[2] ? styles[2] : "cover"}
        className={classes.image}
        src={images?.[image % images.length]?.url || "/images/fallback.png"}
        layout="fill"
      />
      <Box className={classes.titleContainer}>
        <Typography className={classes.title} variant="subtitle2" title={title}>
          {title}
        </Typography>
      </Box>
      {description && (
        <CardContent className={classes.card}>
          <Typography className={classes.description} variant="body2" title={description}>
            {description}
          </Typography>
        </CardContent>
      )}
      <Box className={classes.seeAll}>
        <Typography children={"View"} variant="caption" />
      </Box>
    </Card>
  );
}

const useGridStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    display: "grid",
    width: "100%",
    height: "100%",
    rowGap: 8,
    columnGap: 8,
    overflow: "hidden",
    padding: theme.spacing(2.2, 2.2, 2.2, 2.2),
    gridTemplateColumns: "repeat(3, 1fr)",
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "1fr",
      alignItems: "center",
    },
  },
}));

export function Grid({ children, ...rest }) {
  const classes = useGridStyles();
  return (
    <Box className={classes.root} {...rest}>
      {children}
    </Box>
  );
}

export const Catelogs = ({ filters = {}, variant = "default" }) => {
  const query = useTags({});
  const router = useRouter();
  if (variant === "infinite") {
    return (
      <GridList
        query={query}
        renderItem={({ item, index }) => (
          <GridItem {...item} key={index} colorIndex={index % colors.length} />
        )}
      />
    );
  }
  const catelogs =
    // @ts-ignore
    query.data?.data?.map((item, index) => ({
      ...item,
      // illustration: `/images/tags/${item.value}.jpeg`,
      variant: "dark",
      title: item.label,
      styles: item.styles,
      images: item.images,
    })) || [];
  return (
    <Grid>
      {catelogs.map((item, index) => (
        <GridItem
          {...item}
          key={index}
          colorIndex={index % colors.length}
          onClick={() => {
            const data = {
              pathname: "/products",
              query: router.query,
            };
            if (!item.title) {
              delete data.query["tags"];
            } else {
              // @ts-ignore
              data.query["tags"] = item.title;
            }
            router.push(data);
          }}
        />
      ))}
    </Grid>
  );
};
