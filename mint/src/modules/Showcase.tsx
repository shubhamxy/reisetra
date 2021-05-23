import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  fade,
  Typography,
} from "@material-ui/core";

const useGridStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    width: "100%",
    height: "100%",
    rowGap: 8,
    columnGap: 8,
    overflow: "hidden",
    padding: theme.spacing(2.2, 2.2, 1.9, 2.2),
    gridTemplateColumns: "repeat(3, 1fr)",
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
  },
}));

const colors = {
  default: {
    background: "#ffffff",
    color: "#000000",
  },
  dark: {
    background: "#ffffff",
    color: "#000000",
  },
  primary: {
    background: "#ffffff",
    color: "#000000",
  },
};
const useGridItemStyles = makeStyles((theme) => ({
  root: ({ variant }) => ({
    display: "flex",
    flex: 1,
    position: "relative",
    flexDirection: "column",
    alignItems: "flex-start",
    cursor: "pointer",
    mixBlendMode: "normal",
    borderRadius: "8.52671px",
    boxShadow: "0px 3.79093px 11.3728px rgba(0, 0, 0, 0.103775)",
    background: colors[variant].background,
    "&:hover": {
      backgroundColor: fade(colors[variant].background, 0.8),
      transition:
        "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    },
  }),
  card: {
    margin: 0,
    padding: "30px 30px 19px 24px",
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
  title: ({ variant }) => ({
    ...theme.typography.caption,
    color: fade(colors[variant].color, 0.8),
    lineHeight: "16px",
  }),
  description: ({ variant }) => ({
    ...theme.typography.body2,
    color: fade(colors[variant].color, 0.8),
    lineHeight: "32px",
    display: "-webkit-box",
    overflow: "hidden",
    WebkitLineClamp: 1,
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
  seeAllText: ({ variant }) => ({
    ...theme.typography.body2,
    color: fade(colors[variant].color, 0.8),
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
  variant = "default",
  title,
  description,
}) {
  const classes = useGridItemStyles({ variant });
  return (
    <Card elevation={0} className={classes.root}>
      <CardMedia
        className={classes.image}
        image={"/images/1.jpeg"}
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
            children={"$200"}
            variant="subtitle2"
          />
        </Box>
      </CardContent>
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

const ShowCase = () => {
  const classes = useStyles();
  return (
    <Grid>
      {[
        {
          variant: "primary",
          title: "title",
          description: "description",
          descriptionImage: "/images/icons/dashboard/group.png",
          image: "/images/1.jpeg",
        },
        {
          variant: "dark",
          title: "title",
          description: "description",
          image: "/images/2.jpeg",
        },
        {
          variant: "primary",
          title: "Your Title",
          description: "Your description",
          image: "/images/3.jpeg",
        },
      ].map((item, index) => (
        <GridItem {...item} key={index}></GridItem>
      ))}
    </Grid>
  );
};

export default ShowCase;
