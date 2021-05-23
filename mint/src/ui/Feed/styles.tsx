import {makeStyles, fade} from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		flex: 1,
		flexDirection: "row",
		margin: 0,
		padding: theme.spacing(0.8, 2.0, 0.8, 2.0),
		width: "100%",
		cursor: "pointer",
		overflow: "hidden",
	},
	cover: {},
	img: {
		objectFit: "cover",
	},
	content: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
	},
	contentText: {
		...theme.typography.body2,
		color: "#2E2F2F",
		fontSize: "14px",
		lineHeight: "19px",
		display: "-webkit-box",
		overflow: "hidden",
		WebkitLineClamp: 2,
		WebkitBoxOrient: "vertical",
		wordBreak: "break-all",
	},
	subText: {
		...theme.typography.subtitle2,
		color: "#292C2E",
		fontSize: "12px",
		lineHeight: "16px",
		opacity: 0.5,
	},
}));
