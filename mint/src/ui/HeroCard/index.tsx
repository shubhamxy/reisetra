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
      alignSelf: 'center',
      margin: "0 auto",
      overflow: 'hidden',
      width: "100%",
      // background: "linear-gradient(0deg, #F0F0F0, #F0F0F0), #0B0C0C",
      backgroundImage: `url("/images/hero.jpeg")`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      backgroundPosition: "center center",
      boxShadow: `2px 2px 7px ${fade(theme.palette.common.black, 0.2)}`,
      borderRadius: 8,
      height: 360,
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
    },
    description: {
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
    subtitle = "",
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
