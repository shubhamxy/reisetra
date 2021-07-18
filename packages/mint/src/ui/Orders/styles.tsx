import {makeStyles, fade} from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
	root: {
		width: "100%",
	},
	cover: {},
	img: {
		objectFit: "cover",
	},
  subtext: {
    ...theme.typography.caption,
  },
	content: {
		display: "flex",
    flex: 1,
		flexDirection: "column",
		justifyContent: "space-between",
	},
	contentText: {
		...theme.typography.body2,
		display: "-webkit-box",
		overflow: "hidden",
		WebkitLineClamp: 2,
		WebkitBoxOrient: "vertical",
		wordBreak: "break-all",
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
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  chip: ({}) => ({
    background: theme.palette.primary.main,
    borderRadius: "48px",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px -28px 100px rgba(15, 15, 15, 0.06)",
    marginRight: "8px",
    marginBottom: "8px",

    "&:hover": {
      background: theme.palette.primary.main,
    },
    "&:focus": {
      background: theme.palette.primary.main,
      boxShadow: `0px 0px 0px 4px#d0f20f33`,
    },
  }),
  statusOverlay: {
    position: 'absolute',
  }
}));
