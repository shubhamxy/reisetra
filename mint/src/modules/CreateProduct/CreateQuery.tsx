import {makeStyles, Typography, Avatar, Badge, Box, Button, fade, TextareaAutosize, FormControl} from "@material-ui/core";
import React from "react";
import Image from "next/image";
import { useFileUpload } from "../../libs/rock/file";
import {  ImagePreview } from "../../ui/MediaPreview";

const useStyles = makeStyles(theme => ({
	userProfile: {
		height: 40,
		width: 40,
	},
	btn: {
		backgroundColor: "#000",
		color: "#fff",
		minWidth: "175px",
		height: "46px",
		borderRadius: "25px",
		"&:disabled": {
			backgroundColor: fade("#000", 0.8),
			cursor: "not-allowed",
		},
	},
	closeBtn: {
		height: 24,
		width: 24,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		fontSize: 18,
		lineHeight: 0,
		borderRadius: "50%",
		border: "none",
		color: "#02783d",
		cursor: "pointer",
		margin: 0,
		padding: 0,
		position: "absolute",
		top: 20,
		right: 20,
	},

	actions: {
		margin: 0,
		padding: theme.spacing(3, 6.4, 4, 6.4),
		background: "#fff",
		display: "flex",
		flexDirection: "column",
	},
	titleInput: {
		...theme.typography.h3,
		display: "flex",
		marginBottom: "12px",
		fontSize: "30px",
		lineHeight: "41px",
		border: "none",
		color: "#131415",
		resize: "none",
		caretColor: "#18B765",
		padding: 0,
		margin: 0,
		"&::placeholder": {
			fontWeight: 500,
			color: "#292c2e",
			// font-family: $regularFont,
			opacity: 0.2,
		},
	},
	contentInput: {
		position: "relative",
		...theme.typography.body1,
		display: "flex",
		minHeight: "54px",
		marginBottom: "12px",
		fontSize: "20px",
		border: "none",
		resize: "none",
		caretColor: "#18B765",
		color: "#131415",
		"&::placeholder": {
			fontWeight: 500,
			color: "#292c2e",
			// font-family: $regularFont,
			opacity: 0.2,
		},
	},
	avatar: {
		width: "32px",
		height: "32px",
	},
	headercontent: {
		padding: 0,
		margin: 0,
		width: "100%",
	},
	titleWrap: {
		display: "flex",
		flexDirection: "column",
		marginLeft: "8px",
		marginRight: "16px",
		flex: 1,
	},
	title: {
		...theme.typography.body1,
		fontWeight: 600,
		fontSize: "26px",
		lineHeight: "37px",
		textAlign: "center",
		letterSpacing: "-0.416667px",
		color: "#f0f0f0",
		maxWidth: "500px",
		margin: "0 auto",
	},
	subtitle: {
		...theme.typography.subtitle2,
		fontStyle: "normal",
		fontWeight: 400,
		fontSize: "12px",
		lineHeight: "16px",
		color: fade("#131415", 0.5),
	},
	subtext: {
		fontFamily: "GalanoGrotesque-Regular, Arial",
		fontStyle: "normal",
		fontWeight: 400,
		fontSize: "14px",
		lineHeight: "19px",
		color: "#ADADAD",
	},
	contentTitle: {
		padding: theme.spacing(0.6, 0, 0.6, 0),
		...theme.typography.h1,
		fontWeight: 600,
		fontSize: "22px",
		lineHeight: "30px",
		maxWidth: "80%",
		color: "#131415",
	},
	contentMedia: {},
	contentDescriptionWrap: {
		padding: theme.spacing(1.2, 0, 1.2, 0),
	},
	contentDescription: {
		padding: theme.spacing(1.4, 0, 1.4, 0),
		...theme.typography.subtitle2,
		fontWeight: 500,
		fontSize: "14px",
		lineHeight: "19px",
		letterSpacing: "-0.271429px",
		color: fade("#131415", 0.5),
	},
	actionsWrap: {
		borderTop: "1px solid #F0F3F6",
		margin: 0,
		padding: theme.spacing(1.6, 6.4, 1.6, 6.4),
	},
	headActionsWrap: {
		margin: 0,
		padding: 0,
	},
	tagBtn: {
		minWidth: "72px",
		height: "22px",
		background: "#16B7FF",
		marginRight: "8px",
		border: "unset",
	},
	likeBtn: {
		height: "32px",
		width: "32px",
		padding: 0,
		margin: 0,
	},
	moreBtn: {
		height: "32px",
		width: "32px",
		padding: 0,
		margin: 0,
	},
	replyBtn: {
		height: "32px",
		width: "32px",
		padding: 0,
		margin: 0,
	},
	actionBtn: {
		marginRight: 0,
		padding: 0,
		margin: 0,
	},
	collapseContainer: {
		padding: 0,
		margin: 0,
	},
	repliesContentRoot: {
		padding: 0,
		margin: 0,
		"&:last-child": {
			paddingBottom: 0,
		},
	},
	moreTags: {
		border: "1px solid #BDBDBD",
		minWidth: "23px",
		height: "23px",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: "50%",
		cursor: "pointer",
	},
	moreTagsText: {
		color: "#BDBDBD",
		padding: theme.spacing(0.3, 0.5, 0.4, 0.4),
		fontSize: "12px",
	},
	nextbtn: {
		backgroundColor: "#000",
		color: "#fff",
		minWidth: "175px",
		height: "46px",
		borderRadius: "25px",
		"&:hover": {
			backgroundColor: fade("#000", 0.8),
		},
		".Mui-disabled": {},
	},
	btnWrap: {
		"& .Mui-disabled": {
			color: "#fff",
			boxShadow: "none",
			backgroundColor: "rgba(5, 5, 5, 0.735)",
		},
	},
	toolbarText: {
		fontSize: 15,
	},
	badgeContainer: {
		...theme.typography.body1,
		top: "10%",
		width: 15,
		background: "#F6BB43",
		fontSize: 13,
		lineHeight: 0,
		padding: 0,
		margin: 0,
		color: "#fff",
		overflow: "hidden",
	},
}));

function Actions({
	isValid,
	values,
	setFieldValue,
	nextBtnLabel,
	classes,
	handleNext,
}) {
	const imageUpload = useFileUpload({
    fileType: 'images',
		multiple: true,
		onSuccess: files => {
			setFieldValue("images", [...files, ...values.images]);
		},
	});

	const docsUpload = useFileUpload({
    fileType: 'documents',
		accept: [".pdf"],
		multiple: true,
		onSuccess: files => {
			setFieldValue("docs", [...files, ...values.docs]);
		},
	});

	return (
		<Box display={"flex"} flex={1} width="100%">
			<Box
				flex={1}
				display={"flex"}
				justifyContent="flex-start"
				alignItems="center"
				border="2px solid #efefef"
				borderRadius="100px"
				height="50px"
				pl={2.2}
				pr={0.8}
			>
				<Box display={"flex"} flex={1}>
					<Typography className={classes.toolbarText} variant="body1">
						Add to your post
					</Typography>
				</Box>

				<Box>
					<Badge
						badgeContent={values.tags?.length || 0}
						classes={{badge: classes.badgeContainer}}
					>
						<Button
							className="gradient-btn-tags"
							onClick={() => {
								setFieldValue("step", 1);
							}}
							style={{width: "36px", height: "36px"}}
						>
							<Image
								src={"/images/icons/dashboard/tag.svg"}
								quality={1}
								height={18}
								width={18}
							/>
						</Button>
					</Badge>
					<Badge
						badgeContent={values.docs?.length || 0}
						classes={{badge: classes.badgeContainer}}
					>
						<Button
							className="gradient-btn-docs"
							onClick={docsUpload.open}
							style={{width: "36px", height: "36px"}}
						>
							<input {...docsUpload.getInputProps()} />
							<Image
								src={"/images/icons/dashboard/docs.svg"}
								quality={1}
								height={18}
								width={18}
							/>
						</Button>
					</Badge>
					<Badge
						badgeContent={values.images?.length || 0}
						classes={{badge: classes.badgeContainer}}
					>
						<Button
							className="gradient-btn-media"
							onClick={imageUpload.open}
							{...imageUpload.getRootProps}
							style={{width: "36px", height: "36px"}}
						>
							<input {...imageUpload.getInputProps()} />
							<Image
								src={"/images/icons/dashboard/img.svg"}
								quality={1}
								height={18}
								width={18}
							/>
						</Button>
					</Badge>
				</Box>
			</Box>
			<Box
				ml={2}
				display={"flex"}
				justifyContent="flex-end"
				alignItems="center"
				className={classes.btnWrap}
			>
				<Button
					variant="contained"
					disabled={!isValid}
					className={classes.nextbtn}
					onClick={handleNext}
				>
					<Typography variant={"h5"}>{nextBtnLabel}</Typography>
				</Button>
			</Box>
		</Box>
	);
}

export default function CreateQuery({
	onError,
	setFieldValue,
	values,
	handleChange,
	nextBtnLabel,
	isValid,
	handleNext,
	onCloseHandler,
}) {
	const classes = useStyles();
	return (
		<Box component="section" className="post-query-container post-query">
			<Box className="post-query-head">
				<Box className="post-query-head-title">
					<span>Hello! Post a question!</span>
				</Box>
			</Box>
			<Box className="post-query-content">
				<TextareaAutosize
					required
					id="question"
					name="question"
					autoFocus
					onChange={handleChange}
					value={values.question}
					className="post-query-content-textarea"
					placeholder="Question in mind? Ask our Alumni"
				/>
				<Box display="flex" flexDirection="column">
					<ImagePreview
						key={"images"}
						showRemoveIcon
						handleRemoveItem={(e, index, item) => {
							const images = [...values.images];
							images.splice(index, 1);
							setFieldValue("images", images);
						}}
						data={values.images}
					/>
				</Box>
			</Box>
			<Box className="post-query-actions">
				<Actions
					nextBtnLabel={nextBtnLabel}
					classes={classes}
					values={values}
					setFieldValue={setFieldValue}
					isValid={isValid}
					handleNext={handleNext}
				/>
			</Box>
		</Box>
	);
}
