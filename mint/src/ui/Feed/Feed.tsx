import React, {useEffect} from "react";
import {
	Paper,
	Box,
	Typography,
	makeStyles,
  CircularProgress,
  Divider,
} from "@material-ui/core";
import { List } from "../List/List";
import { Footer } from "../List";

export const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		flexDirection: "column",
		width: "290px",
		marginTop: "16px",
		overflow: "hidden",
	},
	list: {
		overflow: "scroll",
		maxHeight: "500px",
	},
}));

export default function ExperiencesFeed() {
	const classes = useStyles();
	return (
		<Paper className={classes.root}>
			<Box
				p={2}
				display={"flex"}
				alignItems={"center"}
				justifyContent={"space-between"}
			>
				<Typography style={{fontWeight: 700, textTransform: "uppercase"}}>
					Popular
				</Typography>
			</Box>
      <Box overflow="scroll" maxHeight={"600px"} className="scrollbar">
					<List
						style={{
							overflow: "hidden",
							borderBottomRadius: "12px",
						}}
						ItemSeparatorComponentProps={{
							height: 2,
							style: {},
						}}
						ItemSeparatorComponent={Divider}
						// data={data.data}
						// isEmpty={totalCount === 0}
						ListEmptyComponent={() => (
							<Box
								display="flex"
								justifyContent="center"
								alignItems="center"
								height="320px"
							>
								<Typography variant="subtitle2">
									No  yet
								</Typography>
							</Box>
						)}
						// renderItem={({item, index}) =>
						// 		<div
						// 			index={index}
						// 			key={index}
						// 			data={item}
						// 			user={user}
						// 			tabIndex={value}
						// 			onClick={handleClick}
						// 		/>
						// }
						ListFooterComponent={Footer}
						ListFooterComponentProps={{
							hasNextPage: 0,
							fetchNextPage: 0,
							totalDataCount: 0,
							totalCount: 0,
							isLoading: false,
							showCount: false,
						}}
						isLoading={true}
						ListLoadingComponent={() => (
							<Box
								display="flex"
								flexDirection="column"
								justifyContent="center"
								alignItems="center"
								pt={2}
								pb={2}
							>
								<CircularProgress size={24} />
							</Box>
						)}
					/>
				</Box>
		</Paper>
	);
}
