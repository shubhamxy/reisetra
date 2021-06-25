import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Box, Card, CardContent, fade, Typography } from "@material-ui/core";
import { useCategories } from "../../libs";
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
      alignItems: 'center',
    },
  },
}));

const colors = {
  default: { background: "#ffffff", color: "#000000" },
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
    padding: "30px 30px 19px 30px",
    cursor: "pointer",
    width: "275px",
    height: "352px",
    mixBlendMode: "normal",
    boxShadow: "0px 3.79093px 11.3728px rgba(0, 0, 0, 0.103775)",
    borderRadius: "8.52671px",
    color: styles && styles[0] ? styles[0] : colors[variant].color,
    background: styles && styles[1] ? styles[1] : colors[variant].background,
    objectFit: "cover",
    backgroundSize: "auto 100%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    "&:hover": {
      transition:
        "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: '100%',
      margin: "0 auto",
    }
  }),
  card: {
    padding: 0,
    margin: 0,
  },
  title: ({ variant }) => ({
    ...theme.typography.caption,
    fontSize: "12px",
  }),
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
  seeAll: {
    position: "absolute",
    bottom: "24px",
    left: "24px",
  },
  seeAllText: ({ variant }) => ({
    ...theme.typography.body2,
    color: fade(colors[variant].color, 0.8),
    fontSize: "12px",
    lineHeight: "14px",
  }),
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
  image,
  illustration,
  illustrationImage,
  illustrationImageHeight,
  onClick,
  styles,
  ...rest
}) {
  const classes = useGridItemStyles({ variant, styles });
  return (
    <Card
      elevation={0}
      className={classes.root}
      style={{ backgroundImage: `url(${illustration})` }}
      onClick={onClick}
    >
      <CardContent className={classes.card}>
        <Typography className={classes.title} variant="subtitle2">
          {title}{" "}
        </Typography>
        <Typography className={classes.description} variant="body2">
          {description}{" "}
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
        {/* <img
					alt=""
					src={
						variant === "default"
							? "/icons/seealldark.svg"
							: "/icons/seeall.svg"
					}
					width={8}
					height={9}
				/> */}
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
const Categories = ({filters}) => {
  const classes = useStyles();
  const router = useRouter();
  const { data } = useCategories();
  const categories =
    // @ts-ignore
    data?.data?.map((item, index) => ({
      variant: "dark",
      title: item.label,
      value: item.value,
      illustration: item.images && item.images.length > 0 ? item.images[0].url : `/images/categories/${item.value}.jpeg`,
      styles: item.styles,
    })) || [];
  return (
    <Grid>
      {categories.map((item, index) => (
        //@ts-ignore
        <GridItem {...item} key={index} onClick={() => {router.push(`products?category=${item.value}`)}}></GridItem>
      ))}
    </Grid>
  );
};

export default Categories;
