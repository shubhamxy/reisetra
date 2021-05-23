import React from "react";
import {Box, Button, fade, makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles(() => ({
	root: {
		minWidth: "660px",
		width: "660px",
		height: "280px",
		maxHeight: "280px",
		display: "flex",
		flexDirection: "column",
		background: "#f0f0f0",
		padding: "32px",
		flex: 1,
		backgroundImage: "url(/images/icons/dashboard/welcome/illustration.svg)",
		backgroundPosition: "top right",
		backgroundRepeat: "no-repeat",
		backgroundSize: "contain",
		justifyContent: "center",
		alignItems: "flex-start",
		paddingLeft: "34px",
	},
	btn: {
		marginTop: "24px",
		color: "#fff",
		minWidth: "175px",
		height: "46px",
		background: "#009D32",
		borderRadius: "49px",
		"&:hover": {
			backgroundColor: fade("#009D32", 0.85),
		},
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
		color: "#fff",
		cursor: "pointer",
		fontWeight: "bold",
		margin: 0,
		padding: 0,
		position: "absolute",
		top: 20,
		right: 20,
		border: "none",
	},
}));

export default function QuerySuccessDialog({handleNext, onCloseHandler}) {
	const classes = useStyles();
	return (
		<Box className={classes.root}>
			<button onClick={onCloseHandler} className={classes.closeBtn}>
				&#xd7;
			</button>
			<Typography variant={"h4"}>You won 300XP!</Typography>
			<Box display="flex">
				<Typography variant={"caption"} style={{maxWidth: "360px"}}>
					Congratulations on posting your first query! You have won 300XP for
					this action
				</Typography>
			</Box>

			<Button
				className={classes.btn}
				onClick={handleNext}
				variant={"contained"}
			>
				<Typography variant={"h5"}>Claim 300 XP</Typography>
			</Button>
		</Box>
	);
}
