/* eslint-disable jsx-a11y/alt-text */
import React, {useState} from "react";
import {fade, makeStyles} from "@material-ui/core/styles";
import {Box, Dialog, Typography} from "@material-ui/core";
import Image from "next/image";
const useStyles = makeStyles(theme => ({
	root: {
		marginTop: "1rem",
	},
	gridList: {
		display: "flex",
		flexWrap: "wrap",
		width: "100%",
		flex: 1,
		overflow: "scroll",
		alignItems: "center",
		justifyContent: "flex-start",
	},
	gridItem: {
		display: "flex",
		alignItems: "center",
		cursor: "pointer",
		justifyContent: "center",
		padding: theme.spacing(0.6, 1, 0.6, 1),
		marginRight: "10px",
		marginBottom: "10px",
		borderRadius: "43px",
		maxWidth: "140px",
		backgroundColor: "#E5EAF1",
		position: "relative",
		"&:hover": {
			transition:
				"background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
		},
		"&:last-child": {
			marginRight: 0,
		},
	},
	icon: {
		width: "100%",
		objectFit: "cover",
		height: "64px",
	},
	container: {
		display: "flex",
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
		fontSize: 12,
		fontWeight: 500,
		lineHeight: "19px",
		color: "#2E2E2E",
		display: "-webkit-box",
		WebkitLineClamp: 1,
		overflow: "hidden",
		WebkitBoxOrient: "vertical",
		wordBreak: "break-all",
		maxWidth: "100px",
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
	closeBtn: {
		height: 20,
		width: 20,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		fontSize: 14,
		lineHeight: 0,
		borderRadius: "50%",
		background: fade("#000000", 0.4),
		color: "#fff",
		border: "none",
		cursor: "pointer",
		margin: 0,
		padding: 0,
		position: "absolute",
		top: 5,
		right: 6,
	},
	closePreviewBtn: {
		height: 42,
		width: 42,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		fontSize: 30,
		lineHeight: 0,
		borderRadius: "50%",
		background: fade("#ffffff"),
		color: "#000000",
		border: "none",
		cursor: "pointer",
		margin: 0,
		padding: 0,
		position: "absolute",
		top: 10,
		right: 0,
	},
	paper: {
		backgroundColor: "transparent",
		boxShadow: "none",
	},
	previewContainer: {
		borderRadius: "12px",
		width: "100%",
		maxWidth: "720px",
		height: "100%",
		display: "flex",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		overflow: "visible",
	},
	doc: {
		display: "flex",
		height: "80vh",
		flex: 1,
	},
}));

export default function DocsPreview({
	className,
	data,
	showTitleBar = true,
	showRemoveIcon = false,
	handleRemoveItem,
}) {
	const classes = useStyles();
	const [isOpen, setIsOpen] = useState(false);
	const [openDoc, setOpenDoc] = useState({});
	if (!data || data.length === 0) {
		return null;
	}
	return (
		<Box className={`${className ? className + " " : ""}${classes.root}`}>
			<Dialog
				maxWidth="lg"
				keepMounted={false}
				open={isOpen}
				classes={{paper: classes.paper}}
				onClose={() => {
					setIsOpen(false);
					setOpenDoc({});
				}}
				style={{backgroundColor: "transparent"}}
			>
				<Box
					width="600px"
					justifyContent="center"
					alignItems="center"
					display="flex"
					pr={6}
					bgcolor="transparent"
					bgColor="#ffffff"
				>
					<object
						className={classes.doc}
						data={openDoc.mediaUrl}
						alt={`document ${openDoc.mediaUrl}`}
						key={openDoc.mediaUrl}
					/>
					<button
						onClick={() => setIsOpen(false)}
						className={classes.closePreviewBtn}
					>
						&#xd7;
					</button>
				</Box>
			</Dialog>

			<Box className={classes.gridList}>
				{data.map((item, index) => (
					<Box key={index} className={classes.gridItem}>
						<Box
							className={classes.container}
							onClick={e => {
								e.preventDefault();
								e.stopPropagation();
								setIsOpen(true);
								setOpenDoc(item);
							}}
						>
							<Image
								src="/images/icons/dashboard/file-pdf.svg"
								className={classes.icon}
								width={20}
								height={20}
							/>
							{showTitleBar && (
								<Typography
									children={item.mediaName}
									className={classes.title}
								/>
							)}
						</Box>
						{showRemoveIcon && (
							<button
								onClick={e => {
									e.preventDefault();
									e.stopPropagation();
									handleRemoveItem(e, index, item);
								}}
								className={classes.closeBtn}
							>
								&#xd7;
							</button>
						)}
					</Box>
				))}
			</Box>
		</Box>
	);
}
