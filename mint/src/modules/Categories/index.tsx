import React, { useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Box, Card, CardContent, fade, Typography } from "@material-ui/core";
import { useCategories, useInterval } from "../../libs";
import { useRouter } from "next/router";

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

const colors = {
  default: {
    background: "#ffffff",
    color: "#000000"
  },
  dark: {
    background: "#1A1A1A",
    color: "#fff",
  },
  primary: {
    background: "#74D125",
    color: "#fff",
  },
};
const useGridItemStyles = makeStyles<Theme, any>((theme) => ({
  root: ({ variant, styles }) => ({
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
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.10)",
    borderRadius: 8,
    color: styles && styles[0] ? styles[0] : colors[variant].color,
    background: styles && styles[1] ? styles[1] : colors[variant].background,
    backgroundSize: colors && colors[2] ? colors[2] : "auto 100%",
    backgroundPosition: "center",
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
  description: ({ variant, styles }) => ({
    ...theme.typography.body2,
    color: styles && styles[0] ? styles[0] : fade(colors[variant].color, 0.9),
    fontSize: "24px",
    lineHeight: "32px",
    paddingBottom: "24px",
  }),
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

// common responsive css grid variants
export function Grid({ children, ...rest }) {
  const classes = useGridStyles();
  return (
    <Box className={classes.root} {...rest}>
      {children}
    </Box>
  );
}

export function GridItem({
  children,
  variant = "default",
  title,
  description,
  descriptionImage,
  descriptionImage2,
  illustration,
  illustrationImage,
  illustrationImageHeight,
  onClick,
  styles,
  images,
  ...rest
}) {
  const classes = useGridItemStyles({ variant, styles });
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
      style={{ backgroundImage: `url(${images?.[image]?.url || illustration})` }}
      onClick={onClick}
    >
      <CardContent className={classes.card}>
        <Box className={classes.titleContainer}>
          <Typography className={classes.title} variant="subtitle2">
            {title}
          </Typography>
        </Box>
        <Typography className={classes.description} variant="body2">
          {description}
        </Typography>
        {descriptionImage && (
          <Box className={classes.group}>
            <img alt="" src={descriptionImage} height={"40px"} />
          </Box>
        )}

        {descriptionImage2 && (
          <Box className={classes.group}>
            <img alt="" src={descriptionImage2} height={"40px"} />
          </Box>
        )}
      </CardContent>
      <Box className={classes.seeAll}>
        <Typography
          className={classes.seeAllText}
          children={"See All"}
          variant="caption"
        />
      </Box>
      {/* <Box
				className={classes.illustration}
			>
				{illustration && (
					<img
						alt=""
						src={illustration}
            height={'100%'}
						objectFit={"cover"}
					/>
				)}

			</Box> */}
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  description: {
    ...theme.typography.body2,
    color: "#1A1A1A",
    fontSize: "24px",
    lineHeight: "32px",
    paddingBottom: "24px",
  },
}));
const Categories = ({ filters }) => {
  const classes = useStyles();
  const router = useRouter();
  const { data } = useCategories();
  const categories =
    // @ts-ignore
    data?.data?.map((item, index) => ({
      variant: "dark",
      title: item.label,
      value: item.value,
      illustration: `/images/categories/${item.value}.jpeg`,
      styles: item.styles,
      images: item.images,
    })) || [];
  return (
    <Grid>
      {categories.map((item, index) => (
        //@ts-ignore
        <GridItem
          {...item}
          key={index}
          onClick={() => {
            if (!item.title) {
              delete router.query["category"];
            } else {
              // @ts-ignore
              router.query["category"] = item.title;
            }
            router.pathname = "/products";
            router.push(router);
          }}
        ></GridItem>
      ))}
    </Grid>
  );
};

export default Categories;
