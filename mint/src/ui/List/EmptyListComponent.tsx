import React from "react";
import {
  Box,
  Typography,
  Button,
  makeStyles
} from "@material-ui/core";
import Image from "next/image";

export const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		flex: 1,
		padding: "10px 10px 10px 10px",
	},
	button: {},
	text: {
    color: theme.palette.text.primary,
		fontWeight: 500,
		fontSize: "14px",
		lineHeight: "19px",
	},
}));

export function EmptyListComponent(props) {
  const {
    icon: Icon,
    imgProps,
    title,
    subtext,
    titleProps = {},
    subtextProps = {},
    buttonText,
    onButtonClick,
    ...rest
  } = props;
  const classes = useStyles();
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      flex={1}
      flexGrow={1}
      {...rest}
    >
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        {Icon ? (
          <Icon
            src={"/icons/folder.svg"}
            height={180}
            width={180}
            objectFit={"contain"}
            {...imgProps} />
        ) : (
          <Image
            src={"/icons/folder.svg"}
            height={180}
            width={180}
            objectFit={"contain"}
            {...imgProps} />
        )}

        <Typography
          variant={"h4"}
          className={classes.text}
          {...titleProps}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          className={classes.text}
          {...subtextProps}
        >
          {subtext}
        </Typography>
        {buttonText && (
          <Button
            onClick={onButtonClick}
            className={classes.button}
            variant="contained"
            type="button"
            color="primary"
          >
            <Typography variant={"subtitle2"}>{buttonText}</Typography>
          </Button>
        )}
      </Box>
    </Box>
  );
}
