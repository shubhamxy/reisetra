import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import PaymentIcon from "@material-ui/icons/Payment";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import WarningIcon from "@material-ui/icons/Warning";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "16px 16px",
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export function OrderTimeline({ status = "CANCELLED" }) {
  const classes = useStyles();
  const level = [
    "NEW",
    "PENDING",
    "CONFIRMED",
    "SHIPPED",
    "DELIVERED",
  ].indexOf(status);
  return (
    <Timeline align="alternate">
      {level > 0 ? (
        <>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot
                color={level > 0 ? "primary" : "secondary"}
                variant="outlined"
                style={{ padding: 8 }}
              >
                <PaymentIcon />
              </TimelineDot>
              <TimelineConnector
                className={level > 1 ? "" : classes.secondaryTail}
              />
            </TimelineSeparator>
            <TimelineContent
            style={{alignItems: 'center', justifyContent: "center", display: "flex"}}
            >
                <Typography
                  color={level > 0 ? "textPrimary" : "secondary"}
                  variant="body2"
                  component="h1"
                >
                  PAYMENT SUCCESS
                </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot
                color={level > 1 ? "primary" : "secondary"}
                variant="outlined"
                style={{ padding: 8 }}
              >
                <ThumbUpIcon />
              </TimelineDot>
              <TimelineConnector
                className={level > 2 ? "" : classes.secondaryTail}
              />
            </TimelineSeparator>
            <TimelineContent
            style={{alignItems: 'center', justifyContent: "center", display: "flex"}}
            >
                <Typography
                  color={level > 1 ? "textPrimary" : "secondary"}
                  variant="body2"
                  component="h1"
                >
                  CONFIRMED
                </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot
                color={level > 2 ? "primary" : "secondary"}
                variant="outlined"
                style={{ padding: 8 }}
              >
                <LocalShippingIcon />
              </TimelineDot>
              <TimelineConnector
                className={level > 3 ? "" : classes.secondaryTail}
              />
            </TimelineSeparator>
            <TimelineContent style={{alignItems: 'center', justifyContent: "center", display: "flex"}}>
                <Typography
                  color={level > 2 ? "textPrimary" : "secondary"}
                  variant="body2"
                  component="h1"
                >
                  SHIPPED
                </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot
                color={level > 3 ? "primary" : "secondary"}
                variant="outlined"
                style={{ padding: 8 }}
              >
                <DoneAllIcon />
              </TimelineDot>
            </TimelineSeparator>
            <TimelineContent style={{alignItems: 'center', justifyContent: "center", display: "flex"}}>
                <Typography
                  color={level > 3 ? "textPrimary" : "secondary"}
                  variant="body2"
                  component="h1"
                >
                  DELIVERED
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
              style={{ padding: 8 }}
            >
              <WarningIcon />
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent style={{alignItems: 'center', justifyContent: "center", display: "flex"}}>
              <Typography
                variant="body2"
                component="h1"
              >
                {String(status).replace("_", " ")}
              </Typography>
          </TimelineContent>
        </TimelineItem>
      )}
    </Timeline>
  );
}
