import React, {useState} from "react";
import {
	Popper,
	ButtonGroup,
	IconButton,
	Grow,
	Dialog,
	TextareaAutosize,
	Button,
	fade,
	Typography,
	Card,
	CardHeader,
	CardContent,
	CardActions,
	Box,
} from "@material-ui/core";
import FormatClearIcon from "@material-ui/icons/FormatClear";
import TitleIcon from "@material-ui/icons/Title";
import {
	FormatBold,
	FormatQuote,
	FormatItalic,
	FormatUnderlined,
	Link,
} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import {useSlate} from "slate-react";

import {toggleMark, isMarkActive} from "../plugins/mark";
import {isLinkActive, insertLink, unwrapLink} from "../plugins/link";
import {Path} from "slate";
import {isBlockActive, toggleBlock} from "../plugins/block";
export function isURL(str) {
	if (!str) {
		return false;
	}
	try {
		const url = new URL(str);
		return true;
	} catch (err) {
		return false;
	}
}
function H2Icon({color}) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			color={color === "primary" ? "#fff" : "#ccc"}
			fill="currentColor"
			class="bi bi-type-h2"
			viewBox="0 0 16 16"
		>
			<path d="M7.638 13V3.669H6.38V7.62H1.759V3.67H.5V13h1.258V8.728h4.62V13h1.259zm3.022-6.733v-.048c0-.889.63-1.668 1.716-1.668.957 0 1.675.608 1.675 1.572 0 .855-.554 1.504-1.067 2.085l-3.513 3.999V13H15.5v-1.094h-4.245v-.075l2.481-2.844c.875-.998 1.586-1.784 1.586-2.953 0-1.463-1.155-2.556-2.919-2.556-1.941 0-2.966 1.326-2.966 2.74v.049h1.223z" />
		</svg>
	);
}

function H3Icon({color}) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			color={color === "primary" ? "#fff" : "#ccc"}
			fill="currentColor"
			class="bi bi-type-h3"
			viewBox="0 0 16 16"
		>
			<path d="M7.637 13V3.669H6.379V7.62H1.758V3.67H.5V13h1.258V8.728h4.62V13h1.259zm3.625-4.272h1.018c1.142 0 1.935.67 1.949 1.674.013 1.005-.78 1.737-2.01 1.73-1.08-.007-1.853-.588-1.935-1.32H9.108c.069 1.327 1.224 2.386 3.083 2.386 1.935 0 3.343-1.155 3.309-2.789-.027-1.51-1.251-2.16-2.037-2.249v-.068c.704-.123 1.764-.91 1.723-2.229-.035-1.353-1.176-2.4-2.954-2.385-1.873.006-2.857 1.162-2.898 2.358h1.196c.062-.69.711-1.299 1.696-1.299.998 0 1.695.622 1.695 1.525.007.922-.718 1.592-1.695 1.592h-.964v1.074z" />
		</svg>
	);
}

const useStyles = makeStyles(theme => ({
	root: {
		background: "#0b3827",
		borderRadius: "8px",
		boxShadow: "0 2px 4px 0 rgb(0 0 0 / 9%)",
		height: "52px",
		display: "flex",
	},
	button: {
		color: theme.palette.common.white,
		opacity: 0.75,
		"&:hover": {
			opacity: 1,
		},
		paddingTop: 8,
		paddingBottom: 8,
		borderRightColor: "#ccc",
	},
	input: {
		...theme.typography.subtitle2,
		background: "#FAFAFA",
		display: "flex",
		flex: 1,
		width: "100%",
		fontSize: "14px",
		lineHeight: "20px",
		border: "none",
		color: "#131415",
		resize: "none",
		caretColor: "#18B765",
		margin: 0,
		padding: 10,
		paddingRight: 20,
		paddingLeft: 20,
		borderRadius: "8px",
		"&::placeholder": {
			...theme.typography.subtitle2,
			fontSize: "14px",
			lineHeight: "20px",
			fontWeight: 500,
			color: "#292c2e",
			// font-family: $regularFont,
			opacity: 0.5,
		},
	},
	addbtn: {
		backgroundColor: "#000",
		minWidth: "120px",
		borderRadius: "25px",
		color: "#fff",
		boxShadow: "none",
		"&:hover": {
			backgroundColor: fade("#000", 0.8),
			boxShadow: "none",
		},
		"&:disabled": {
			color: "#fff",
			boxShadow: "none",
			backgroundColor: "rgba(5, 5, 5, 0.735)",
		},
	},
	cardActions: {
		width: "100%",
		display: "flex",
		padding: 16,
		alignSelf: "flex-end",
		flex: 1,
	},
	cancellbtn: {
		boxShadow: "none",
		backgroundColor: "#fff",
		color: "#000",
		minWidth: "120px",
		borderRadius: "25px",
	},
	close: {
		opacity: 0.75,
		cursor: "pointer",
		"&:hover": {
			opacity: 1,
		},
	},
}));

export function Toolbar({open, ...otherProps}) {
	const [linkSelection, setLinkSelection] = useState(null);
	const [link, setLink] = useState(null);
	const s = useStyles();
	const editor = useSlate();

	const handleMarkClick = format => ev => {
		ev.preventDefault();
		toggleMark(editor, format);
	};
	const activeMarkColor = format =>
		isMarkActive(editor, format) ? "primary" : "inherit";

	const handleBlockClick = format => ev => {
		ev.preventDefault();
		toggleBlock(editor, format);
	};
	const activeBlockColor = format =>
		isBlockActive(editor, format) ? "primary" : "inherit";

	const handleClearMark = ev => {
		ev.preventDefault();
		// @TODO Find a better way??
		editor.removeMark("bold");
		editor.removeMark("italic");
		editor.removeMark("underline");
		editor.removeMark("selected");
		toggleBlock(editor, "paragraph");
	};

	const handleAddLinkClick = () => {
		if (isLinkActive(editor)) {
			unwrapLink(editor);
		} else if (
			editor.selection &&
			Path.equals(editor.selection?.anchor.path, editor.selection?.focus.path)
		) {
			setLinkSelection(editor.selection);
			setLink("");
		}
	};

	const handleInsertLink = () => {
		insertLink(editor, link, linkSelection);
		setLink(null);
	};

	return (
		<Popper
			{...otherProps}
			open={open || link !== null}
			transition
			style={{zIndex: 10000}}
			placement="top"
			modifiers={{offset: {offset: "0px, 5px"}}}
		>
			{({TransitionProps}) => (
				<Grow
					{...TransitionProps}
					timeout={{appear: 300, exit: 200, enter: 100}}
				>
					<div className={s.root}>
						{link === null ? (
							/* Formatting controls */
							<ButtonGroup variant="text" disableRipple>
								<IconButton
									className={s.button}
									size="small"
									onMouseDown={handleMarkClick("bold")}
								>
									<FormatBold
										fontSize="small"
										color={activeMarkColor("bold")}
									/>
								</IconButton>
								<IconButton
									className={s.button}
									size="small"
									onMouseDown={handleMarkClick("italic")}
								>
									<FormatItalic
										fontSize="small"
										color={activeMarkColor("italic")}
									/>
								</IconButton>
								<IconButton
									className={s.button}
									size="small"
									onMouseDown={handleMarkClick("underline")}
								>
									<FormatUnderlined
										fontSize="small"
										color={activeMarkColor("underline")}
									/>
								</IconButton>
								<IconButton
									className={s.button}
									size="small"
									onClick={handleAddLinkClick}
								>
									<Link
										fontSize="small"
										color={isLinkActive(editor) ? "primary" : "inherit"}
									/>
								</IconButton>
								<IconButton
									className={s.button}
									size="small"
									onMouseDown={handleBlockClick("heading-two")}
								>
									<TitleIcon
										fontSize="small"
										color={activeBlockColor("heading-two")}
									/>
								</IconButton>
								<IconButton
									className={s.button}
									size="small"
									onMouseDown={handleClearMark}
								>
									<FormatClearIcon fontSize="small" color={"inherit"} />
								</IconButton>
								<IconButton
									className={s.button}
									size="small"
									onMouseDown={handleBlockClick("block-quote")}
								>
									<FormatQuote
										fontSize="small"
										color={activeBlockColor("block-quote")}
									/>
								</IconButton>
							</ButtonGroup>
						) : (
							<Dialog open={true} fullWidth onClose={() => setLink(null)}>
								<Card style={{padding: 20, paddingTop: 10, paddingBottom: 10}}>
									<CardHeader
										title={<Typography variant="h5">Add Link</Typography>}
									/>
									<CardContent>
										<TextareaAutosize
											rowsMin={1}
											variant="outlined"
											className={s.input}
											value={link}
											rowsMax={4}
											placeholder="Add a link ex. https://wikipedia.org"
											onChange={e => setLink(e.target.value)}
											autoFocus
											margin="dense"
											id="name"
											type="text"
											fullWidth
										/>
									</CardContent>

									<CardActions>
										<Box classes={s.cardActions}>
											<Button
												className={s.cancellbtn}
												variant="text"
												style={{textTransform: "capitalize"}}
												onClick={() => setLink(null)}
											>
												<Typography variant="caption">Cancel</Typography>
											</Button>
											<Button
												disabled={!isURL(link)}
												className={s.addbtn}
												variant="contained"
												onClick={e => {
													e.preventDefault();
													handleInsertLink();
												}}
											>
												<Typography
													component="span"
													style={{textTransform: "capitalize"}}
													variant="caption"
												>
													Add
												</Typography>
											</Button>
										</Box>
									</CardActions>
								</Card>
							</Dialog>
						)}
					</div>
				</Grow>
			)}
		</Popper>
	);
}
