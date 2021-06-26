import React, { useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Box, Card, CardContent, fade, Typography } from "@material-ui/core";
import GridList from "../../ui/List/GridList";
import { useInterval, useProducts, useTags } from "../../libs";
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
    padding: "30px 16px 30px 16px",
    cursor: "pointer",
    height: 372,
    maxWidth: 320,
    mixBlendMode: "normal",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.103775)",
    borderRadius: 8,
    color: colors && colors[0] ? colors[0] : styles[styleIndex].color,
    background: colors && colors[1] ? colors[1] : styles[styleIndex].background,
    backgroundSize: colors && colors[2] ? colors[2] : "auto 100%",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    "&:hover": {
      transition:
        "background-image 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      margin: "0 auto",
    },
  }),
  card: {
    padding: 0,
    margin: 0,
  },
  title: {
    ...theme.typography.caption,
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
  titleContainer: {
    padding: '14px',
    paddingTop: '2px',
    paddingBottom: '2px',
    background: "#00000010",
    backdropFilter: "blur(4px)",
    borderRadius: '6px'
  },
  seeAll: {
    position: "absolute",
    bottom: "24px",
    left: "16px",
    padding: '14px',
    paddingTop: '2px',
    paddingBottom: '2px',
    background: "#00000010",
    backdropFilter: "blur(4px)",
    borderRadius: '6px'
  },
  seeAllText: {
    ...theme.typography.body2,
    fontSize: "12px",
  },
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
  onClick,
}) {
  const classes = useGridItemStyles({ styleIndex, colors });
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
      onMouseEnter={() => images?.length > 0 ? setImage((image + 1) % images.length) : ''}
      onMouseLeave={() => setImage(0)}
      style={{ backgroundImage: `url(${images?.[image]?.url})` }}
      onClick={onClick}
    >
      <CardContent className={classes.card}>
        <Box className={classes.titleContainer}>
          <Typography className={classes.title} variant="subtitle2">
            {title}
          </Typography>
        </Box>

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

const useGridStyles = makeStyles((theme) => ({
  root: {
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

// common responsive css grid variants
export function Grid({ children, ...rest }) {
  const classes = useGridStyles();
  return (
    <Box className={classes.root} {...rest}>
      {children}
    </Box>
  );
}
export const Catelogs = ({ filters, variant = "default" }) => {
  const query = useTags({});
  const router = useRouter();

  return variant === "infinite" ? (
    <GridList
      query={query}
      renderItem={({ item, index }) => (
        <GridItem {...item} key={index} styleIndex={item.style || 0}></GridItem>
      )}
    />
  ) : (
    <Grid>
      {(
        // @ts-ignore
        query?.data?.data?.map((item, index) => ({
          variant: "dark",
          title: item.label,
          value: item.value,
          styles: item.styles,
          images: item.images,
        })) || []
      ).map((item, index) => (
        //@ts-ignore
        <GridItem
          {...item}
          key={index}
          onClick={() => {
            if (!item.title) {
              delete router.query["tags"];
            } else {
              // @ts-ignore
              router.query["tags"] = item.title;
            }
            router.pathname = "/products";
            router.push(router);
          }}
        ></GridItem>
      ))}
    </Grid>
  );
};
