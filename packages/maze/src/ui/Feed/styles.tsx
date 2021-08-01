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
	},
	cover: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
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
		display: "-webkit-box",
		overflow: "hidden",
		WebkitLineClamp: 2,
		WebkitBoxOrient: "vertical",
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
  costContainer: {

  },
  cost: {
  },
}));
