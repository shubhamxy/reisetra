import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Card, CardContent, fade, Typography} from "@material-ui/core";

const useGridStyles = makeStyles(theme => ({
	root: {
		display: "grid",
		width: "100%",
		height: "100%",
    rowGap: 8,
    columnGap: 8,
		overflow: "hidden",
		padding: theme.spacing(2.2, 2.2, 1.9, 2.2),
		gridTemplateColumns: "repeat(3, 1fr)",
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
	},
}));

const colors = {
	default: {background: "#ffffff", color: "#000000"},
	dark: {
		background: "#1A1A1A",
		color: "#fff",
	},
	primary: {
		background: "#74D125",
		color: "#fff",
	},
};
const useGridItemStyles = makeStyles(theme => ({
	root: ({variant}) => ({
		display: "flex",
		flex: 1,
		position: "relative",
		flexDirection: "column",
		alignItems: "flex-start",
		padding: "30px 30px 19px 30px",
		cursor: "pointer",
		width: "275px",
		height: "352px",
		mixBlendMode: "normal",
		boxShadow: "0px 3.79093px 11.3728px rgba(0, 0, 0, 0.103775)",
		borderRadius: "8.52671px",
		background: colors[variant].background,
    backgroundSize: '100%',
    backgroundPosition: 'bottom',
		"&:hover": {
			backgroundColor: fade(colors[variant].background, 0.8),
			transition:
				"background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
		},
	}),
	card: {
		padding: 0,
		margin: 0,
	},
	primary: {
		background: "#74D125",
		"&:hover": {
			backgroundColor: "#74D125",
			opacity: 0.9,
			transition:
				"background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
		},
	},
	dark: {
		background: "#1A1A1A",
		"&:hover": {
			backgroundColor: "#222222",
			opacity: 0.9,
			transition:
				"background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
		},
	},
	title: ({variant}) => ({
		...theme.typography.caption,
		color: fade(colors[variant].color, 0.8),
		fontSize: "12px",
		lineHeight: "16px",
	}),
	description: ({variant}) => ({
		...theme.typography.body2,
		color: fade(colors[variant].color, 0.8),
		fontSize: "24px",
		lineHeight: "32px",
		paddingBottom: "24px",
	}),
	banner: {},
	cover: {},
	group: {},
	seeAll: {
		position: "absolute",
		bottom: "24px",
		left: "24px",
	},
	seeAllText: ({variant}) => ({
		...theme.typography.body2,
		color: fade(colors[variant].color, 0.8),
		fontSize: "12px",
		lineHeight: "14px",
	}),
	illustration: {
		position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
    top: 0,
    width: '100%',
    height: '100%',
	},
}));

// common responsive css grid variants
export function Grid({children, ...rest}) {
	const classes = useGridStyles();
	return (
		<Box className={classes.root} {...rest}>
			{children}
		</Box>
	);
}

export function GridItem({
	children,
	variant = "default",
	title,
	description,
	descriptionImage,
	descriptionImage2,
	image,
	illustration,
	illustrationImage,
	illustrationImageHeight,
	...rest
}) {
	const classes = useGridItemStyles({variant});
	return (
		<Card elevation={0} className={classes.root} style={{backgroundImage: `url(${illustration})`}}>
			<CardContent className={classes.card}>
				<Typography className={classes.title} variant="subtext2">
					{title}{" "}
				</Typography>
				<Typography className={classes.description} variant="body2">
					{description}{" "}
				</Typography>
				{descriptionImage && (
					<Box className={classes.group}>
						<img
							alt=""
							src={descriptionImage}
							height={"40px"}
							objectFit={"contain"}
						/>
					</Box>
				)}

				{descriptionImage2 && (
					<Box className={classes.group}>
						<img
							alt=""
							src={descriptionImage2}
							height={"40px"}
							objectFit={"contain"}
						/>
					</Box>
				)}
			</CardContent>
			<Box className={classes.seeAll}>
				<Typography
					className={classes.seeAllText}
					children={"See All"}
					variant="caption"
				/>
				<img
					alt=""
					src={
						variant === "default"
							? "/images/icons/dashboard/seealldark.svg"
							: "/images/icons/dashboard/seeall.svg"
					}
					width={8}
					height={9}
					objectFit={"contain"}
				/>
			</Box>
			{/* <Box
				className={classes.illustration}
			>
				{illustration && (
					<img
						alt=""
						src={illustration}
            height={'100%'}
						objectFit={"cover"}
					/>
				)}

			</Box> */}
		</Card>
	);
}

const useStyles = makeStyles(theme => ({
	description: {
		...theme.typography.body2,
		color: "#1A1A1A",
		fontSize: "24px",
		lineHeight: "32px",
		paddingBottom: "24px",
	},
}));
const Catelogs = () => {
	const classes = useStyles();
	return (
			<Grid>
				{[
					{
						variant: "primary",
						title: "title",
						description: "description",
						descriptionImage: "/images/icons/dashboard/group.png",
						illustration: "/images/1.jpeg",
					},
					{
						variant: "dark",
						title: "title",
						description: "description",
						illustration: "/images/2.jpeg",
					},
					{
						variant: "primary",
						title: "title",
						description: 'description',
						illustration:  "/images/3.jpeg",
					},
					{
						variant: "dark",
						title: "title",
						description: "description",
						illustration: "/images/4.jpeg",
					},
          {
						variant: "primary",
						title: "title",
						description: "description",
						descriptionImage: "/images/icons/dashboard/group.png",
						illustration: "/images/1.jpeg",
					},
					{
						variant: "dark",
						title: "title",
						description: "description",
						illustration: "/images/2.jpeg",
					},
					{
						variant: "primary",
						title: "title",
						description: 'description',
						illustration:  "/images/3.jpeg",
					},
					{
						variant: "dark",
						title: "title",
						description: "description",
						illustration: "/images/4.jpeg",
					},
				].map((item, index) => (
					<GridItem {...item} key={index}></GridItem>
				))}
			</Grid>
	);
};

export default Catelogs;
