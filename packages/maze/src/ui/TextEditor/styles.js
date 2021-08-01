import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		flex: 1,
		flexDirection: "column",
		position: "relative",
		padding: 0,
		margin: 0,
		boxShadow: "none",
		minHeight: "200px",
		width: "100%",
		height: "100%",
		...theme.typography.caption,
		fontSize: "16px",
		lineHeight: "24px",
	},
	content: {
		width: "100%",
		height: "100%",
		display: "flex",
		flexDirection: "column",
		position: "relative",
		caretColor: "#6016ff",
		padding: 0,
		margin: 0,
		boxShadow: "none",
		...theme.typography.body1,
		"& p": {
			...theme.typography.body1,
		},
		"& ::selection": {
			background: "#6016ff",
		},
		"& h1": {
			...theme.typography.h3,
		},
		"& h2": {
			...theme.typography.h4,
		},
		"& h3": {
			...theme.typography.h5,
		},
		"& a": {
			color: "#0061ff",
			fontStyle: "italic",
		},
		"& blockquote": {
			marginLeft: 0,
			marginRight: 0,
			paddingLeft: "10px",
			fontStyle: "italic",
		},
		"& em": {
			fontStyle: "italic",
		},
		"& strong": {
			fontWeight: "bold",
		},
		"& u": {
      fontStyle: "underline"
    },
	},
}));
