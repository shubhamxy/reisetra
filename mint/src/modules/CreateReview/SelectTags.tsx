import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Image from "next/image";
import {
	Box,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CircularProgress,
	fade,
	Grid,
	InputBase,
  Button,
} from "@material-ui/core";
import {useDebouncedCallback} from "use-debounce";
export const tags = [
	{icon: "🌟", text: "Campus Reputation"},
	{icon: "🎒", text: "Facilities"},
	{icon: "💻", text: "Career options"},
	{icon: "📚", text: "Studying as a minority"},
	{icon: "📕", text: "Learning opportunities"},
	{icon: "🎒", text: "Faculty"},
	{icon: "👨‍🏫", text: "Quality of teaching"},
	{icon: "🦻", text: "Faculty accessibility"},
	{icon: "🏆", text: "Academic club"},
	{icon: "👩‍🏫", text: "Faculty student ratio"},
	{icon: "🏚", text: "Accommodation"},
	{icon: "🦺", text: "Campus safety"},
	{icon: "🗺", text: "School location"},
	{icon: "🚘", text: "Campus parking"},
	{icon: "🚌", text: "Transportation"},
	{icon: "🌟", text: "Medical facilities"},
	{icon: "🌟", text: "Social fabric"},
	{icon: "🌟", text: "Extracurricular activities"},
	{icon: "🌟", text: "Future"},
	{icon: "🌟", text: "Alumni engagement"},
	{icon: "🌟", text: "Job opportunities"},
	{icon: "💁‍♂️", text: "Career"},
	{icon: "💰", text: "Financial"},
	{icon: "🌟", text: "Scholarship"},
	{icon: "🌟", text: "Financial aid"},
	{icon: "🌟", text: "Fee"},
	{icon: "🌟", text: "Cost of living"},
	{icon: "🌟", text: "Part time job"},
];

const useStyles = makeStyles(theme => ({
	root: {
		maxHeight: 700,
		minHeight: 700,
		display: "flex",
		flexDirection: "column",
		position: "relative",
		flex: 1,
	},
	header: {
		margin: 0,
		padding: theme.spacing(4.4, 6.4, 4.4, 0),
		display: "flex",
		flexDirection: "column",
	},
	content: {
		display: "flex",
		flex: 1,
		flexDirection: "column",
		padding: theme.spacing(0, 11.4, 0, 11.4),
	},
	actions: {
		margin: 0,
		display: "flex",
		flexDirection: "column",
		padding: theme.spacing(0, 6.4, 4, 6.4),
	},
	avatar: {
		width: "32px",
		height: "32px",
	},
  avatarWrap: {},
  subtitle: {},
  headActionsWrap: {},
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
		maxWidth: "500px",
		paddingLeft: 16,
	},
	searchContainer: {},
	search: {
		height: "50px",
		position: "relative",
		paddingLeft: 20,
		display: "flex",
		borderRadius: 24,
		backgroundColor: fade("#D8D8D8", 0.3),
		"&:hover": {
			backgroundColor: fade("#D8D8D8", 0.25),
		},
	},
	inputInput: {
		padding: theme.spacing(2, 3, 2, 1),
		// vertical padding + font size from searchIcon
		transition: theme.transitions.create("width"),
		[theme.breakpoints.up("md")]: {},
	},
	inputRoot: {
		width: "100%",
	},
	taglist: {
		display: "flex",
		flexWrap: "wrap",
		paddingTop: theme.spacing(1.6),
	},
	closeBtn: {

	},
	nextbtn: {

	},
	saveasdraft: {

	},
	btnWrap: {},
	backBtn: {

	},
}));

function Actions({
	isValid,
	classes,
	handleNext,
	t,
}) {
	return (
		<Box
			display={"flex"}
			flex={1}
			width="100%"
			justifyContent="center"
			alignItems="center"
			className={classes.btnWrap}
		>
			<Box>
				<Button
					variant="contained"
          size="medium"
					disabled={!isValid}
					className={classes.nextbtn}
					onClick={handleNext}
				>
					<Typography variant={"caption"}>{t.actions.nextBtnText}</Typography>
				</Button>
			</Box>
		</Box>
	);
}

export default function CreateExperience({
	values,
	setFieldValue,
	onCloseHandler,
	handleNext,
	handleSaveAsDraft,
	handleGoBack,
	isValid,
	isLoading,
	t = {
		actions: {
			saveBtnText: "Save as draft",
			nextBtnText: "Publish",
		},
	},
}) {
	const classes = useStyles();
	const [tagList, setTagList] = useState(tags);
	const debounced = useDebouncedCallback(value => {
		let filteredData = tags;
		if (value.length > 0) {
			filteredData = tags.filter(item => {
				return Object.keys(item).some(key =>
					item[key]
						? String(item[key])
								.toLowerCase()
								.includes(String(value)?.toLowerCase())
						: false,
				);
			});
		}
		setTagList(filteredData);
	}, 500);

	return (
		<Card classes={{root: classes.root}}>
			<CardHeader
				classes={{
					root: classes.header,
					avatar: classes.avatarWrap,
					content: classes.headercontent,
					title: classes.titleWrap,
					subheader: classes.subtitle,
					action: classes.headActionsWrap,
				}}
				title={
					<Box display="flex" alignItems="center" justifyContent="flex-start">
						<Button className={classes.backBtn} onClick={handleGoBack}>
							<Image src={"/images/arrow-back.svg"} height={16} width={40} />
						</Button>
						<Typography
							component="span"
							children={"Add relevant tags"}
							className={classes.title}
						/>
					</Box>
				}
			/>
			<CardContent className={classes.content}>
				<Box display="flex" width="100%" m={0}>
					<Grid item xs className={classes.searchContainer}>
						<Box className={classes.search}>
							<Image
								src={"/images/icons/search-gray.svg"}
								width={16}
								height={16}
							/>
							<InputBase
								onChange={e => {
									debounced(e.target.value);
								}}
								defaultValue={""}
								placeholder="Search for tags"
								classes={{
									root: classes.inputRoot,
									input: classes.inputInput,
								}}
								inputProps={{"aria-label": "search"}}
							/>
						</Box>
						<Box display="flex" mt={"16px"} ml={"10px"}>
							<Typography variant={"body1"}>
								{values?.tags?.length || 0}
							</Typography>
							<Typography
								variant={"caption"}
								style={{paddingLeft: "4px", fontSize: 16, lineHeight: 1.4}}
							>
								selected
							</Typography>
						</Box>
					</Grid>
				</Box>
				<Box
					display="flex"
					width="100%"
					m={0}
					flexDirection="column"
					position="relative"
					mb={"16px"}
				>
					{/* <TagList
						selected={values.tags}
						data={tagList}
						onSelect={({item, index}) => {
							const isSelected = values.tags.includes(item.text);

							if (isSelected) {
								setFieldValue(
									"tags",
									values.tags.filter(tag => !(tag === item.text)),
								);
							} else {
								setFieldValue("tags", [...values.tags, item.text]);
							}
						}}
						className={classes.taglist}
					/> */}
					<Box display="flex" mt={1.6} justifyContent="center">
						<Typography
							variant={"caption"}
							style={{paddingLeft: "4px", fontSize: 16, lineHeight: 1.4}}
						>
							{isLoading ? <CircularProgress size="20px" /> : ""}
						</Typography>
					</Box>
				</Box>
				<Box display="flex" width="100%" m={0}></Box>
			</CardContent>
			<CardActions className={classes.actions}>
				<Actions
					t={t}
					classes={classes}
					isValid={isValid}
					handleSaveAsDraft={handleSaveAsDraft}
					handleNext={handleNext}
				/>
			</CardActions>
		</Card>
	);
}
