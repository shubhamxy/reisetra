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
		caretColor: "#18B765",
		padding: 0,
		margin: 0,
		boxShadow: "none",
		color: "#0f0f0f",
		...theme.typography.caption,
		fontSize: "16px",
		lineHeight: "24px",
		"& p": {
			...theme.typography.caption,
			fontSize: "16px",
			lineHeight: "24px",
		},
		"& ::selection": {
			background: "#18b765",
		},
		"& h1": {
			...theme.typography.h1,
		},
		"& h2": {
			...theme.typography.h2,
			fontSize: "24px",
			lineHeight: "28px",
		},
		"& h3": {
			...theme.typography.h3,
			fontSize: "20px",
			lineHeight: "24px",
		},
		"& a": {
			color: "#0061ff",
			fontStyle: "italic",
		},
		"& blockquote": {
			borderLeft: "2px solid #ddd",
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
		"& u": {},
	},
}));
