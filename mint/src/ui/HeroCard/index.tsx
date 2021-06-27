import * as React from "react";
import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  createStyles,
  makeStyles,
  Typography,
  Button,
  CardActions,
  fade,
} from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundImage: `url("/images/hero.jpeg")`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
      boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.15)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: 320,
      // [theme.breakpoints.down("sm")]: {
      //   // backgroundPosition: "center",
      // },
    },
    content: {
      height: "100%",
      display: "flex",
      textAlign: "center",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      maxWidth: 620,
      color: theme.palette.common.white,
      [theme.breakpoints.down("sm")]: {
        maxWidth: 400,
      },
    },
    title: {
      color: theme.palette.common.white,
      ...theme.typography.h3,
      textAlign: "center",
      [theme.breakpoints.down("sm")]: {
        // ...theme.typography.h4,
      },
    },
    subtitle: {
      color: theme.palette.common.white,
      ...theme.typography.caption,
      fontSize: 16,
      textAlign: "center",
    },
    description: {
      color: theme.palette.common.white,
      ...theme.typography.body1,
      textAlign: "center",
      [theme.breakpoints.down("sm")]: {
        ...theme.typography.body1,
      },
    },
    actionsContainer: {},
  })
);

export default React.memo(function HeroCard(
  props: Partial<{
    actions: React.ReactChild;
    data: {
      title: string;
      subtitle?: string;
      description?: string;
      backgroundImage?: string;
    };
  }>
) {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  const [activeQuizIndex, setActiveQuizIndex] = useState(0);
  const quizStep = () => {
    setActiveQuizIndex(activeQuizIndex + 1);
  };
  const {
    title = "Get better recommendations",
    subtitle = "",
    description = "",
    backgroundImage,
  } = props.data || {};

  return (
    <Card
      className={classes.root}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}
    >
      <CardContent className={classes.content}>
        {title && (
          <Typography
            style={{ textTransform: "uppercase" }}
            className={classes.title}
          >
            {title}
          </Typography>
        )}
        {subtitle && (
          <Typography className={classes.subtitle} variant={"caption"}>
            {subtitle}
          </Typography>
        )}
        {description && (
          <Typography className={classes.description} variant={"body1"}>
            {description}
          </Typography>
        )}
        {props.actions && <CardActions>{props.actions}</CardActions>}
      </CardContent>
    </Card>
  );
});
