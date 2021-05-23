import React, {useEffect} from "react";
import {Box, fade, makeStyles, Typography, Button} from "@material-ui/core";
import {useInView} from "react-intersection-observer";

export const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		flex: 1,
		padding: "10px 10px 10px 10px",
		alignItems: "flex-end",
	},
	button: {},
	text: {
		fontWeight: 500,
		fontSize: "14px",
		lineHeight: "19px",
		color: fade("#131415", 0.6),
	},
}));

export default function Footer({
	hasNextPage,
	fetchNextPage,
	totalDataCount = 0,
	totalCount = 0,
	showCount,
}) {
	const {ref, inView} = useInView({
		threshold: 1,
		initialInView: false,
		delay: 0,
	});
	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inView, hasNextPage]);
	const classes = useStyles();
	return totalDataCount !== 0 && totalCount !== 0 ? (
		<Box className={classes.root}>
			<Box display={"flex"} flex={1} ref={ref}>
				{hasNextPage && (
					<Button
						className={classes.button}
						color={"primary"}
						variant={"text"}
						onClick={fetchNextPage}
					>
						<Typography
							children={`View more`}
							align="center"
							className={classes.text}
							variant="caption"
						/>
					</Button>
				)}
			</Box>
			<Box display={"flex"}>
				{showCount && (
					<Typography
						children={`${totalDataCount} of ${totalCount}`}
						align="center"
						className={classes.text}
						variant="caption"
					/>
				)}
			</Box>
		</Box>
	) : null;
}
