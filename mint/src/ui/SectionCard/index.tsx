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
} from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundImage: `url("/images/hero.jpeg")`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "bottom",
      boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.15)",
      display: "flex",
      flexDirection: "column",
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: "200px",
    },
    content: {
      height: "100%",
      display: "flex",
      maxWidth: '400px',
      textAlign: 'center',
      flexDirection: "column",
      justifyContent: 'center',
      alignItems: 'center',
      color: theme.palette.common.white,
    },
    description: {
      ...theme.typography.caption,
      fontSize: 16,
      color: theme.palette.common.white,
      textAlign: 'center'
    },
    actionsContainer: {},
  })
);
export const SectionCard = React.memo(function SectionCard({}) {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  const [visible, setVisible] = useState(true);
  return visible ? (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        {/* <Typography style={{textTransform: 'uppercase'}} variant={"h4"}>Get better recommendations</Typography> */}
        <Typography className={classes.description} variant={"caption"}>
          Answer a few questions and we’ll help you find the products which best
          suits your preferences
        </Typography>
        <Box display={"flex"} pt={2.4}>
          <Button
            onClick={() => setShowModal(true)}
            color={"primary"}
            variant={"contained"}
          >
            Get Started
          </Button>{" "}
          <Button
            onClick={() => {setVisible(false)}}
            style={{ marginLeft: 30 }}
            variant={"text"}
          >
            Dismiss
          </Button>
        </Box>
      </CardContent>
    </Card>
  ) : null;
});
