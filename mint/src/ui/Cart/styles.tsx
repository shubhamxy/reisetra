import {makeStyles, fade} from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		flex: 1,
		flexDirection: "row",
		margin: 0,
		padding: theme.spacing(1.2, 2.4, 1.2, 2.4),
		width: "100%",
		cursor: "pointer",
    alignItems: "center",
	},
	cover: {},
	img: {
		objectFit: "cover",
	},
	content: {
    paddingLeft: 16,
	},
	title: {
		...theme.typography.body2,
		display: "-webkit-box",
		overflow: "hidden",
		WebkitLineClamp: 2,
		WebkitBoxOrient: "vertical",
		wordBreak: "break-all",
    maxWidth: "70%",
	},
	subText: {
		...theme.typography.caption,
    display: "-webkit-box",
		overflow: "hidden",
		WebkitLineClamp: 2,
		WebkitBoxOrient: "vertical",
		wordBreak: "break-all",
		opacity: 0.8,
	},
}));
