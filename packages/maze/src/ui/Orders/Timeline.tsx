import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import PaymentIcon from "@material-ui/icons/Payment";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import WarningIcon from "@material-ui/icons/Warning";
import Typography from "@material-ui/core/Typography";
import { Check, Done } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  paper: {
  },
  secondaryTail: {
  },
  content: {
    display: 'flex',
    alignItems: "center"
  }
}));

export function OrderTimeline({ status = "CANCELLED" }) {
  const classes = useStyles();
  const level = ["NEW", "PENDING", "CONFIRMED", "SHIPPED", "DELIVERED"].indexOf(
    status
  );
  return (
    <Timeline align="right">
      {level > 0 ? (
        <>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot
                color={level > 0 ? "primary" : "secondary"}
                variant="outlined"
              >
                <PaymentIcon color={level > 0 ? "primary" : "action"} />
              </TimelineDot>
              <TimelineConnector
                className={level > 1 ? "" : classes.secondaryTail}
              />
            </TimelineSeparator>
            <TimelineContent className={classes.content} >
              <Typography
                color={level > 0 ? "textSecondary" : "textPrimary"}
                variant="subtitle2"
                component="h1"
              >
                Payment Success <Check style={{ fontSize: 16, visibility: level > 0 ? 'visible': 'hidden' }} color={level > 0 ? "primary" : "secondary"}/>
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot
                color={level > 1 ? "primary" : "grey"}
                variant="outlined"
              >
                <ThumbUpIcon color={level > 1 ? "primary" : "action"} />
              </TimelineDot>
              <TimelineConnector
                className={level > 2 ? "" : classes.secondaryTail}
              />
            </TimelineSeparator>
            <TimelineContent
              className={classes.content}
            >
              <Typography
                color={level > 1 ? "textSecondary" : "textPrimary"}
                variant="subtitle2"
                component="h1"
              >
                Confirmed <Check style={{ fontSize: 16, visibility: level > 1 ? 'visible' : 'hidden' }} color={level > 1 ? "primary" : "secondary"} />
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot
                color={level > 2 ? "primary" : "grey"}
                variant="outlined"
              >
                <LocalShippingIcon color={level > 2 ? "primary" : "action"} />
              </TimelineDot>
              <TimelineConnector
                className={level > 3 ? "" : classes.secondaryTail}
              />
            </TimelineSeparator>
            <TimelineContent
              className={classes.content}
            >
              <Typography
                color={level > 2 ? "textSecondary" : "textPrimary"}
                variant="subtitle2"
                component="h1"
              >
                Shipped <Check style={{ fontSize: 16, visibility: level > 2 ? 'visible' : 'hidden' }} color={level > 2 ? "primary" : "secondary"} />
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot
                color={level > 3 ? "primary" : "grey"}
                variant="outlined"
              >
                <DoneAllIcon color={level > 3 ? "primary" : "action"} />
              </TimelineDot>
            </TimelineSeparator>
            <TimelineContent
              className={classes.content}
            >
              <Typography
                color={level > 3 ? "textSecondary" : "textPrimary"}
                variant="subtitle2"
                component="h1"
              >
                Delivered <Check style={{ fontSize: 16, visibility: level > 3 ? 'visible' : 'hidden' }} color={level > 3 ? "primary" : "secondary"} />
              </Typography>
            </TimelineContent>
          </TimelineItem>
        </>
      ) : (
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot
              color={"primary"}
              variant="outlined"
            >
              <WarningIcon />
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent
            className={classes.content}
          >
            <Typography variant="subtitle2" component="h1">
              {String(status).replace("_", " ")}
            </Typography>
          </TimelineContent>
        </TimelineItem>
      )}
    </Timeline>
  );
}
