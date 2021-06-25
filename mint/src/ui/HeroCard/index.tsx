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
      backgroundPosition: "center center",
      boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.15)",
      display: "flex",
      flexDirection: "column",
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 320,
      [theme.breakpoints.down("sm")]: {
        backgroundPosition: "center left",
      }
    },
    content: {
      height: "100%",
      display: "flex",
      textAlign: 'center',
      flexDirection: "column",
      justifyContent: 'center',
      alignItems: 'center',
      maxWidth: 620,
      [theme.breakpoints.down("sm")]: {
        maxWidth: 400,
      }
    },
    description: {
      ...theme.typography.caption,
      fontSize: 16,
      textAlign: 'center',
      [theme.breakpoints.down("sm")]: {
        fontSize: 20,
        ...theme.typography.subtitle2,
      }
    },
    actionsContainer: {},
  })
);

export default React.memo(function HeroCard(
  props: Partial<{
    actions: React.ReactChild;
    data: { title: string; subtitle: string; backgroundImage: string };
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
    backgroundImage,
  } = props.data || {};

  return (
    <Card className={classes.root} style={backgroundImage ? {background: `url(${backgroundImage})`}: {}}>
      <CardContent className={classes.content}>
        <Typography style={{ textTransform: "uppercase" }} variant={"h3"}>
          {title}
        </Typography>
        <Typography className={classes.description} variant={"caption"}>
          {subtitle}
        </Typography>
        {props.actions && <CardActions>{props.actions}</CardActions>}
      </CardContent>
    </Card>
  );
});
