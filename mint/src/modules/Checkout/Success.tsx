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
import Image from "next/image";

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		flexDirection: "column",
		background: "#f0f0f0",
		padding: theme.spacing(4, 2.6, 4, 2.6),
		flex: 1,
		position: "relative",
    width: "100%",
	},
	illustration: {
		display: "flex",
		flexDirection: "column",
	},
	illustrationmain: {
		position: "absolute",
		right: 0,
		bottom: 0,
		objectFit: "contain",
	},
	title: {
		...theme.typography.h5,
	},
	description: {
		...theme.typography.subtitle1,
	},

	nextbtn: {

	},
	content: {
		display: "flex",
		flex: 1,
		flexDirection: "column",
		padding: 0,
		position: "relative",
	},
	almamater: {},
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
		background: "#000000",
		color: "#ffffff",
		cursor: "pointer",
		margin: 0,
		fontWeight: "bold",
		padding: 0,
		position: "absolute",
		top: 20,
		right: 20,
		zIndex: 100,
		border: "none",
	},
}));

function Actions({isValid, classes, handleNext}) {
	return (
		<Box
			display={"flex"}
			flex={1}
			width="100%"
			justifyContent="flex-end"
			alignItems="center"
			className={classes.btnWrap}
		>
			<Box mr={1.6} pt={1.4}>
				<Button
          size="large"
          color="secondary"
					variant="contained"
					// disabled={!isValid}
					className={classes.nextbtn}
					onClick={handleNext}
				>
					<Typography variant={"caption"}>
						Done
					</Typography>
				</Button>
			</Box>
		</Box>
	);
}

export default function Success({
	handleNext,
	onCloseHandler,
}) {
	const classes = useStyles();
	return (
		<Card classes={{root: classes.root}}>
			<button onClick={onCloseHandler} className={classes.closeBtn}>
				&#xd7;
			</button>

			<Box className={classes.illustration}>
				<img
					className={classes.illustrationmain}
					alt=""
					src="/icons/illustration-success.png"
				/>
				<img
					className={classes.illustrationmain}
					alt=""
					src="/icons/illustration-front.png"
				/>
			</Box>

			<CardContent className={classes.content}>
				<Box display="flex" flexDirection="column">
					<Box display="flex">
						<Typography className={classes.title}>Thank You!</Typography>
					</Box>
					<Box display="flex">
						<Typography
							variant={"caption"}
							style={{maxWidth: "420px"}}
							className={classes.description}
						>
							Order places successfully. we'll send a confirmation on the email.
						</Typography>
					</Box>
				</Box>
			</CardContent>
			<CardActions className={classes.actions}>
				<Actions
					isValid
					classes={classes}
					handleNext={handleNext}
				/>
			</CardActions>
		</Card>
	);
}
