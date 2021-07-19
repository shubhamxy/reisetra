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
    width: "100%",
    height: "100%",
		display: "flex",
		flexDirection: "column",
		background: "#f0f0f0",
		padding: theme.spacing(4, 5.4, 4.5, 5.4),
		flex: 1,
		borderRadius: "30px",
		position: "relative",
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
		maxWidth: "46%",
	},
	title: {
		...theme.typography.h3,
		fontSize: "32px",
		lineHeight: "49px",
	},
	description: {
		...theme.typography.body1,
		fontSize: "16px",
		color: "#3F4A56",
		lineHeight: "24px",
	},
	collegeList: {
		maxWidth: "50%",
		display: "grid",
		gridTemplateColumns: "repeat(2, 1fr)",
		gridRowGap: "30px",
		gridGap: "0px",
		justifyItems: "center",
		overflowY: "auto",
		padding: "24px",
		paddingLeft: 0,
		marginBottom: 16,
	},
	collegePic: {
		position: "absolute",
		top: -23,
		right: 17,
		objectFit: "cover",
		overflow: "hidden",
		backgroundBlendMode: "normal, normal, overlay",
		mixBlendMode: "normal",
	},
	collegeName: {
		fontSize: "14px",
	},
	collegeLocation: {
		fontSize: "12px",
		color: fade("#292C2E", 0.6),
	},
	nextbtn: {
		backgroundColor: "#0f0f0f",
		color: "#fff",
		minWidth: "154px",
		height: "50px",
		borderRadius: "25px",
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
		overflow: "scroll",
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
		background: "#ffffff",
		color: "#0f0f0f",
		cursor: "pointer",
		margin: 0,
		fontWeight: "bold",
		padding: 0,
		position: "absolute",
		top: 48,
		right: 48,
		zIndex: 100,
		border: "none",
	},
}));

function Actions({isValid, classes, hasNext, handleSkipForNow, handleNext}) {
	return (
		<Box
			display={"flex"}
			flex={1}
			width="100%"
			justifyContent="flex-start"
			alignItems="center"
			className={classes.btnWrap}
		>
			<Box mr={1.6}>
				<Button
					variant="contained"
					// disabled={!isValid}
					className={classes.nextbtn}
					onClick={handleNext}
				>
					<Typography variant={"h5"}>
						{hasNext ? "Next" : "Done"}
					</Typography>
				</Button>
			</Box>
			{hasNext && (
				<Box>
					<Button
						variant="outlined"
						// disabled={!isValid}
						className={classes.saveasdraft}
						onClick={handleSkipForNow}
					>
						<Typography variant={"h5"}>Skip for now</Typography>
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
	academics,
}) {
	const classes = useStyles();
	return (
		<Card classes={{root: classes.root}}>
			<button onClick={onCloseHandler} className={classes.closeBtn}>
				&#xd7;
			</button>

			<Box className={classes.illustration}>
				<Image
					className={classes.illustrationmain}
					alt=""
					src="/icons/illustration-success.png"
          layout="fill"
				/>
				<Image
					className={classes.illustrationmain}
					alt=""
					src="/icons/illustration-front.png"
          layout="fill"
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
							Thank you for sharing your review.
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
