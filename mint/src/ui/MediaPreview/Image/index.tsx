import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Dialog, Typography} from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

const useStyles = makeStyles(theme => ({
	root: {
		padding: "16px 0px 0 0px",
		overflow: "hidden",
	},
	gridList: ({length, selected}) => ({
		display: "grid",
		gridTemplateColumns:
			length === 1
				? "1fr"
				: length === 2
				? "1fr 1fr"
				: length === 3
				? "repeat(5, 1fr)"
				: "repeat(5, 1fr)",
		gridTemplateRows:
			length === 2 ? "1fr" : length === 3 ? "repeat(6, 1fr)" : "repeat(3, 1fr)",
		gridGap: "4px",
		alignItems: "stretch",
		justifyItems: "center",
		margin: "auto",
		...(selected !== undefined
			? {
					border: `1px solid ${
						selected ? theme.palette.primary.main : "transparent"
					}`,
			  }
			: {}),
	}),
	gridItem: ({length, borderRadius}) => ({
		overflow: "hidden",
		borderRadius: borderRadius || "2px",
		display: "flex",
		cursor: "pointer",
		width: "100%",
		gridColumn: length === 3 ? "span 2" : "span 1",
		gridRow: length === 3 ? "span 3" : "span 1",
		height: "100%",
		maxHeight: length <= 2 ? "304px" : length === 3 ? "150px" : "100px",
		// minHeight: length === 2 ? "300px" : "100px",
		"&:nth-child(1)": {
			gridColumn: length === 2 ? "span 1" : length === 3 ? "span 3" : "span 4",
			gridRow: length === 2 ? "span 1" : length === 3 ? "span 6" : "span 3",
			height: "100%",
			maxHeight: length === 2 ? "304px" : "308px",
			minHeight: "300px",
			alignItems: "center",
		},
		justifyContent: "center",
		"&:hover": {
			"& .closebtn": {
				opacity: 1,
			},
		},
	}),

	list: {
		display: "grid",
		gridTemplateColumns: "repeat(5, 1fr)",
		gridTemplateRows: "1fr",
		gridGap: "4px",
		alignItems: "start",
		justifyItems: "center",
		margin: "auto",
		overflow: "hidden",
	},
	listItem: ({cellHeight, cellWidth, borderRadius}) => ({
		display: "flex",
		cursor: "pointer",
		width: cellWidth || "100%",
		gridColumn: "span 1",
		gridRow: "span 1",
		height: cellHeight || "100px",
		justifyContent: "center",
		borderRadius: borderRadius || "0px",
		overflow: "hidden",
		"&:hover": {
			"& button": {
				opacity: 1,
			},
		},
	}),
	image: ({objectFit}) => ({
		objectFit: objectFit || "cover",
		height: "100%",
		width: "100%",
	}),
	imageback: ({objectFit}) => ({
		position: "absolute",
		right: 0,
		left: 0,
		width: "100%",
		height: "100%",
		objectFit: objectFit || "cover",
		zIndex: 0,
	}),
	imageBg: {
		background: "#fafafa",
		objectFit: "cover",
	},
	titleBar: {
		background:
			"linear-gradient(to top, rgba(0,0,0,0.7) 0%, " +
			"rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
	},
	icon: {
		color: "white",
	},
	closeBtn: {
		height: 26,
		width: 26,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		fontSize: 20,
		lineHeight: 0,
		borderRadius: "50%",
		background: "#000000",
		color: "#ffffff",
		border: "none",
		cursor: "pointer",
		margin: 0,
		padding: 0,
		position: "absolute",
		top: 10,
		right: 10,
		opacity: 0,
		"&:hover": {
			opacity: 1,
		},
		transition: "opacity ease 0.4s",
	},
	closePreviewBtn: {
		height: 26,
		width: 26,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		fontSize: 20,
		lineHeight: 0,
		borderRadius: "50%",
		background: "#ffffff",
		color: "#000000",
		border: "none",
		cursor: "pointer",
		margin: 0,
		padding: 0,
		position: "absolute",
		top: "10px",
		right: "10px",
		opacity: 0.9,
		"&:hover": {
			opacity: 1,
		},
		transition: "opacity ease 0.8s",
	},
	prev: {
		height: 40,
		width: 40,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		fontSize: 30,
		borderRadius: "50%",
		background: "#ffffff",
		lineHeight: 0,
		color: "#000000",
		border: "none",
		cursor: "pointer",
		margin: 0,
		padding: 0,
		position: "absolute",
		left: "-62px",
		top: "calc(50% - 21px)",
		opacity: 0.9,
		"&:disabled": {
			opacity: 0.3,
		},
		transition: "opacity ease 0.5s",
	},
	next: {
		height: 40,
		width: 40,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		lineHeight: 0,
		borderRadius: "50%",
		background: "#ffffff",
		color: "#000000",
		border: "none",
		cursor: "pointer",
		margin: 0,
		padding: 0,
		position: "absolute",
		right: "-62px",
		top: "calc(50% - 21px)",
		opacity: 0.9,
		"&:disabled": {
			opacity: 0.3,
		},
		transition: "opacity ease 0.5s",
	},
	paper: {
		borderRadius: "12px",
		maxWidth: "100%",
		maxHeight: "100%",
		height: "480px",
		width: "720px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		overflow: "visible",
		backgroundColor: "rgba(0,0,0,.9)",
	},
	previewContainer: {
		backgroundColor: "transparent",
		boxShadow: "none",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: "100%",
		position: "relative",
	},
	previewimage: {
		objectFit: "contain",
		display: "flex",
		maxWidth: "100%",
		maxHeight: "100%",
		flex: 1,
	},
}));

function ListView({
	classes,
	data,
	setOpenIndex,
	showRemoveIcon,
	handleRemoveItem,
	showTitleBar,
	listTileCount,
}) {
	return (
		<Box className={classes.list}>
			{data.slice(0, listTileCount).map((tile, index) => (
				<Box
					className={classes.listItem}
					position="relative"
					onClick={e => {
						e.preventDefault();
						e.stopPropagation();
						setOpenIndex(index);
					}}
				>
					<img
						className={classes.image}
						src={tile.url}
						alt={tile.title}
						key={tile.url}
					/>
					{showRemoveIcon && (
						<button
							onClick={e => {
								e.preventDefault();
								e.stopPropagation();
								handleRemoveItem(e, index, tile);
							}}
							className={classes.closeBtn}
						>
							&#xd7;
						</button>
					)}
					{showTitleBar && (
						<Typography
							children={tile.mediaName}
							className={classes.titleBar}
						/>
					)}
				</Box>
			))}
			{data.length > listTileCount && (
				<Box
					className={classes.listItem}
					justifyContent="center"
					alignItems="center"
					onClick={e => {
						e.preventDefault();
						e.stopPropagation();
						setOpenIndex(listTileCount);
					}}
				>
					<Typography
						children={`+${data.length - listTileCount} more`}
						variant="body1"
					/>
				</Box>
			)}
		</Box>
	);
}

function GridView({
	classes,
	data,
	setOpenIndex,
	showRemoveIcon,
	handleRemoveItem,
	showTitleBar,
}) {
	return (
		<Box className={classes.gridList}>
			{data.slice(0, 3).map((tile, index) => (
				<Box
					key={index}
					className={classes.gridItem}
					position="relative"
					onClick={e => {
						e.preventDefault();
						e.stopPropagation();
						setOpenIndex(index);
					}}
				>
					<img
						className={classes.image}
						src={tile.url}
						alt={tile.title}
						key={tile.url}
					/>
					{showRemoveIcon && (
						<button
							onClick={e => {
								e.preventDefault();
								e.stopPropagation();
								handleRemoveItem(e, index, tile);
							}}
							className={`${classes.closeBtn}`}
						>
							&#xd7;
						</button>
					)}
					{showTitleBar && (
						<Typography
							children={tile.mediaName}
							className={classes.titleBar}
						/>
					)}
				</Box>
			))}
			{data.length > 3 && (
				<Box
					className={classes.gridItem}
					height="100%"
					minHeight="100px"
					position="relative"
					onClick={e => {
						e.preventDefault();
						e.stopPropagation();
						setOpenIndex(3);
					}}
				>
					<img
						className={classes.imageback}
						src={data[3].url}
						alt={data[3].title}
						key={data[3].url}
					/>
					<Box
						display="flex"
						width="100%"
						height="100%"
						position="absolute"
						bgcolor="rgba(46, 46, 46, 0.8)"
						justifyContent="center"
						alignItems="center"
						zIndex={1}
					>
						<Typography
							style={{color: "#fff", fontSize: "20px"}}
							children={`+${data.length - 3} more`}
							variant="caption"
						/>
					</Box>
				</Box>
			)}
		</Box>
	);
}
interface DataT {
  url: string,
  title?: string,
};
interface ImagePreview {
  [x: string]: any;
  data: DataT[];
  style?: any;
  className?: any;
  cellHeight?: any;
  borderRadius?: any;
  cellWidth?: any;
  variant?: string;
  objectFit?: string;
  selected?: any;
  focused?: any;
  showTitleBar?: boolean;
  showRemoveIcon?: boolean;
  handleRemoveItem?: (e: React.MouseEvent<HTMLElement, MouseEvent>, index: number, tile: DataT) => any;
  listTileCount?: number;
}

export default function ImagePreview({
	style,
	className,
	cellHeight,
	borderRadius,
	cellWidth,
	variant = "grid",
	objectFit = "cover",
	selected,
	focused,
	data,
	showTitleBar = false,
	showRemoveIcon = false,
	handleRemoveItem,
	listTileCount = 4,
	...other
}: ImagePreview) {
	const classes = useStyles({
		length: data?.length,
		objectFit,
		cellWidth,
		cellHeight,
		borderRadius,
		selected,
	});
	const [openIndex, setOpenIndex] = useState(-1);
	if (!data || data.length === 0) {
		return null;
	}
	return (
		<div
			contentEditable={false}
			style={style}
			className={`${className ? className + " " : ""}${classes.root}`}
			{...other}
		>
			{variant === "grid" ? (
				<GridView
					classes={classes}
					data={data}
					showRemoveIcon={showRemoveIcon}
					showTitleBar={showTitleBar}
					setOpenIndex={setOpenIndex}
					handleRemoveItem={handleRemoveItem}
				/>
			) : (
				<ListView
					classes={classes}
					data={data}
					showRemoveIcon={showRemoveIcon}
					showTitleBar={showTitleBar}
					setOpenIndex={setOpenIndex}
					handleRemoveItem={handleRemoveItem}
					listTileCount={listTileCount}
				/>
			)}

			<Dialog
				maxWidth="lg"
				keepMounted={false}
				open={openIndex > -1}
				fullWidth
				classes={{paper: classes.paper, container: classes.previewContainer}}
				onClose={() => setOpenIndex(-1)}
				scroll="paper"
				style={{backgroundColor: "transparent"}}
			>
				<button
					onClick={() => setOpenIndex(openIndex - 1)}
					className={classes.prev}
					disabled={openIndex === 0}
				>
					<NavigateBeforeIcon />
				</button>

				{openIndex > -1 && data[openIndex]?.url && (
					<img
						className={classes.previewimage}
						src={data[openIndex]?.url}
						alt={`${data[openIndex]?.url}`}
						key={data[openIndex]?.url}
					/>
				)}

				<button
					onClick={() => setOpenIndex(openIndex + 1)}
					className={classes.next}
					disabled={openIndex === data.length - 1}
				>
					<NavigateNextIcon />
				</button>

				{openIndex > -1 && (
					<button
						onClick={() => setOpenIndex(-1)}
						className={classes.closePreviewBtn}
					>
						&#xd7;
					</button>
				)}
			</Dialog>
		</div>
	);
}
