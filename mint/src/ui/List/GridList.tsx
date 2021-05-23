import React, {useEffect} from "react";

import {makeStyles} from "@material-ui/core/styles";
import {Box, Container, fade, Typography, Button} from "@material-ui/core";
import {List} from "./List";
import Image from "next/image";
import {useInView} from "react-intersection-observer";

const useStyles = makeStyles(theme => ({
	root: {
		display: "grid",
		gridTemplateColumns: "repeat(3, 1fr)",
		gridGap: "10px",
		width: "100%",
		padding: theme.spacing(3, 2.4, 3, 2.4),
	},
	gridItem: {
		display: "flex",
		flexDirection: "column",
		borderRadius: "4px",
		cursor: "pointer",
		height: "200px",
		width: "180px",
		"&:hover": {
			backgroundColor: "#f6f9fa",
			transition:
				"background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
		},
	},
	imageContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: "4px",
		flex: 1,
		height: "122px",
		overflow: "hidden",
	},
	image: {
		width: "100%",
		objectFit: "cover",
		height: "122px",
	},
	titleContainer: {
		display: "flex",
		flexDirection: "column",
		borderRadius: "4px",
		overflow: "hidden",
		padding: theme.spacing(0.4, 0.4, 1, 0.4),
	},
	emptyContainer: {
		display: "flex",
		flex: 1,
		flexDirection: "column",
		borderRadius: "4px",
		overflow: "hidden",
		justifyContent: "center",
		alignItems: "center",
		padding: theme.spacing(0.4, 0.4, 1, 0.4),
	},
	emptyText: {
		color: fade("#292C2E", 0.6),
		fontSize: 14,
		fontWeight: 500,
	},
	title: {
		fontSize: 14,
		fontWeight: 600,
		lineHeight: "19px",
		color: "#131415",
		display: "-webkit-box",
		WebkitLineClamp: 2,
		minHeight: "38px",
		overflow: "hidden",
		WebkitBoxOrient: "vertical",
		wordBreak: "break-all",
	},
	subtitle: {
		fontSize: 12,
		fontWeight: 500,
		color: "#B0BAC5",
	},
	viewMoreWrap: {
		display: "flex",
		padding: theme.spacing(2, 2, 2, 2),
		alignItems: "flex-end",
		flex: 1,
	},
	viewMoreText: {
		fontWeight: 500,
		fontSize: "14px",
		lineHeight: "19px",
		color: fade("#131415", 0.6),
	},
}));

function Footer({
	classes,
	hasNextPage,
	fetchNextPage,
	totalCount,
	totalDataCount,
}) {
	const {ref, inView} = useInView();
	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inView, hasNextPage]);

	return totalDataCount > 0 && totalCount > 0 ? (
		<Box className={classes.viewMoreWrap}>
			<Box display={"flex"} flex={1}>
				{hasNextPage && (
					<Button className={classes.addConnectionBtn} onClick={fetchNextPage}>
						<Typography
							children={"View more"}
							align="center"
							className={classes.viewMoreText}
							variant="caption"
						/>
					</Button>
				)}
			</Box>
			<Box display={"flex"}>
				<Typography
					children={`${totalDataCount} of ${totalCount}`}
					align="center"
					className={classes.viewMoreText}
					variant="caption"
				/>
			</Box>
		</Box>
	) : null;
}

export default function GridList({
	data,
	totalCount,
	totalDataCount,
	fetchNextPage,
	emptyProps,
	onCardClick,
	hasNextPage,
}) {
	const classes = useStyles();
	return (
		<Container disableGutters style={{flex: 1}}>
			<List
				data={data}
				classes={{content: classes.root}}
				ListEmptyComponentProps={{
					icon: () => (
						<Image
							src={"/images/icons/dashboard/no-experiences.svg"}
							height={180}
							width={180}
							objectFit={"contain"}
						/>
					),
					...emptyProps,
				}}
				ListFooterComponent={Footer}
				ListFooterComponentProps={{
					classes,
					hasNextPage,
					fetchNextPage,
					totalDataCount,
					totalCount,
				}}
				isEmpty={totalCount === 0}
				renderItem={({item, index}) => (
					<Box
						key={item._id}
						className={classes.gridItem}
						onClick={e => onCardClick(e, item)}
					>
						<Box className={classes.imageContainer}>
							{item?.images?.length > 0 ? (
								<img
									src={item?.images[0].mediaUrl}
									alt={"experience"}
									className={classes.image}
								/>
							) : (
								<Box
									flex={1}
									display="flex"
									justifyContent="center"
									width="100%"
									alignItems="center"
									bgcolor="#E5EAF1"
								>
									<Image
										src="/images/icons/dashboard/file.svg"
										width={32}
										height={32}
									/>
								</Box>
							)}
						</Box>
						{item.title && (
							<Box className={classes.titleContainer}>
								<Typography variant="body2" className={classes.title}>
									{item.title}
								</Typography>
								<Typography variant="subtitle2" className={classes.subtitle}>
								</Typography>
							</Box>
						)}
					</Box>
				)}
			/>
		</Container>
	);
}
