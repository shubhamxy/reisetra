import React from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  fade,
  makeStyles,
  Typography,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(4, 5.4, 4.5, 5.4),
    flex: 1,
    position: "relative",
  },
  title: {

  },
  description: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 24,
  },
  nextbtn: {
    backgroundColor: "#0f0f0f",
    color: "#fff",
    "&:hover": {
      backgroundColor: fade("#0f0f0f", 0.8),
    },
    ".Mui-disabled": {},
  },
  saveasdraft: {
    backgroundColor: "transparent",
    color: "#0f0f0f",
    minWidth: "154px",
    height: "50px",
    borderRadius: "25px",
    border: "1px solid #131415",
    ".Mui-disabled": {},
  },
  content: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    padding: 0,
    position: "relative",
    minHeight: 300,
  },
  actions: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: 0,
  },
  closeBtn: {
    height: 26,
    width: 26,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 18,
    lineHeight: 18,
    borderRadius: "50%",
    background: "#ffffff",
    color: "#0f0f0f",
    cursor: "pointer",
    margin: 0,
    fontWeight: "bold",
    padding: 0,
    position: "absolute",
    top: 24,
    right: 24,
    zIndex: 100,
    border: "none",
  },
}));

function Actions({ isValid, classes, hasNext, handleSkipForNow, handleNext }) {
  return (
    <Box
      display={"flex"}
      flex={1}
      width="100%"
      justifyContent="flex-start"
      alignItems="center"
      className={classes.btnWrap}
    >
      <Box>
        <Button
          color="primary"
          variant="contained"
          // disabled={!isValid}
          className={classes.nextbtn}
          onClick={handleNext}
        >
          {hasNext ? "Next" : "Done"}
        </Button>
      </Box>
      {hasNext && (
        <Box  ml={1.6}>
          <Button
            color="primary"
            variant="outlined"
            // disabled={!isValid}
            className={classes.saveasdraft}
            onClick={handleSkipForNow}
          >
            Skip for now
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default function Success({
  handleSkipForNow,
  handleNext,
  hasNext = true,
  onCloseHandler,
}) {
  const classes = useStyles();
  return (
    <Card classes={{ root: classes.root }}>
      <button onClick={onCloseHandler} className={classes.closeBtn}>
        &#xd7;
      </button>

      <CardContent className={classes.content}>
        <Box display="flex" flexDirection="column">
          <Box display="flex" className={classes.title}>
            <Typography variant="h3" >Thank You!</Typography>
          </Box>
          <Box
            className={classes.description}
          >
            <Typography
              variant={"h6"}
              style={{ maxWidth: "420px" }}
            >
              Thank you for sharing your story.
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActions className={classes.actions}>
        <Actions
          isValid
          hasNext={hasNext}
          classes={classes}
          handleSkipForNow={handleSkipForNow}
          handleNext={handleNext}
        />
      </CardActions>
    </Card>
  );
}
