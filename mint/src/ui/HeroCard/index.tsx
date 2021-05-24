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
} from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: "100%",
      background: "linear-gradient(0deg, #F0F0F0, #F0F0F0), #0B0C0C",
      backgroundImage: `url("/images/hero.jpeg")`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
      boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.15)",
      borderRadius: 8,
      height: 362,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    content: {
      height: "100%",
      display: "flex",
      maxWidth: "600px",
      textAlign: "center",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: theme.palette.common.white,
    },
    description: {
      color: theme.palette.common.white,
      textAlign: "center",
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
    subtitle = "Answer a few questions and we’ll help you find the colleges which best suits your preferences",
    backgroundImage,
  } = props.data || {};

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Typography style={{ textTransform: "uppercase" }} variant={"h3"}>
          {title}
        </Typography>
        <Typography className={classes.description} variant={"body2"}>
          {subtitle}
        </Typography>
        {props.actions && <CardActions>{props.actions}</CardActions>}
      </CardContent>
    </Card>
  );
});
