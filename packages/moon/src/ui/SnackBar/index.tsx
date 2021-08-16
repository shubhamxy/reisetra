import React from "react";
import SnackbarOG from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles, Theme } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import {
  closeSnackBar,
  useGlobalDispatch,
  useGlobalState,
} from "../../libs/rock/global";

const colors = {
  default: { background: "#f8f8f8", color: "#0f0f0f" },
  info: {
    background: "linear-gradient(180deg, #22a8fc 0%, #1a7ef4 100%)",
    color: "#fff",
  },
  error: {
    background: "linear-gradient(180deg, #e65245 0%, #e43a15 100%)",
    color: "#fff",
  },
  success: {
    background: "linear-gradient(180deg, #bbe653 0%, #46c545 100%)",
    color: "#fff",
  },
};

interface IStyledProps {
  type: "error" | "success" | "info";
}

const useStyles = makeStyles<Theme, IStyledProps>((theme) => ({
  root: ({ type }) => ({
    minHeight: "64px",
    minWidth: "220px",
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 4.2, 0, 4.2),
    marginBottom: 0,
    background: colors[type].background,
    color: colors[type].color,
    flex: 1,
    borderRadius: "8px",
    boxShadow: "0px 2px 6px rgba(15, 15, 15, 0.303775)",
  }),
  icon: ({ type }) => ({
    color: `${colors[type].color} !important`,
  }),
  message: {
    textAlign: "center",
    ...theme.typography.body2,
    lineHeight: "16px",
    fontSize: "16px",
  },
}));

export function Snackbar() {
  const dispatch = useGlobalDispatch();
  const globalState = useGlobalState();
  const {
    snackbar: { message, duration = 6000, type, open, onClick },
  } = globalState;

  const classes = useStyles({ type });
  const handleClose = () => {
    dispatch(closeSnackBar);
  };
  if (!message) return null;
  return (
    <SnackbarOG
      anchorOrigin={{
        vertical: "bottom",
        horizontal: type === "error" ? "center" : "left",
      }}
      children={
        <MuiAlert
          onClick={(e) => {
            if (onClick) {
              onClick();
            }
          }}
          onClose={handleClose}
          severity={type}
          classes={{
            root: classes.root,
            message: classes.message,
            icon: classes.icon,
          }}
          children={message}
        />
      }
      onClick={(e) => {
        if (onClick) {
          onClick();
        }
      }}
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
      action={
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    />
  );
}
