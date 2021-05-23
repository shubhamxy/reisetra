import React from "react";
import {Box, Typography} from "@material-ui/core";
import {useStyles} from "./styles";
import Image from "next/image";
import {useRouter} from "next/router";

function useHelper({id, alumni, isAnonymous}) {
	const router = useRouter();
	const userName = isAnonymous ? "Anonymous" : alumni?.name || " ";
	function handleClick(e) {
		e.preventDefault();
		e.stopPropagation();
		router.push(`/experiences/${id}?ref=${encodeURIComponent(router.asPath)}`);
	}
	return {
		handleClick,
		userName,
	};
}

export default function Card({data, user, className}) {
	const {
		_id: id,
		isAnonymous,
		alumni,
		title,
		images,
	} = data;
	const {handleClick, userName} = useHelper({
		id,
		alumni,
		isAnonymous,
	});

	const classes = useStyles();
	const contentText = '';
	return (
		<Box
			className={className}
			onClick={handleClick}
		>
			<Box className={classes.cover}>
				<Box
					borderRadius="12px"
					overflow="hidden"
					display="flex"
					justifyContent="center"
					alignItems="center"
					bgcolor="#F0F3F6"
					width="62px"
					height="62px"
				>
					{images?.length > 0 ? (
						<img
							src={images[0].mediaUrl}
							alt={"experience"}
							height={62}
							className={classes.img}
						/>
					) : (
						<Image
							src="/images/icons/dashboard/file.svg"
							width={24}
							height={24}
						/>
					)}
				</Box>
			</Box>
			<Box className={classes.content} ml={1.2}>
				<Typography
					className={classes.contentText}
					variant="body1"
					color="textPrimary"
					component="p"
				>
					{title}
				</Typography>
				<Box display="flex">
					<Typography
						className={classes.subText}
						variant="body1"
						color="textPrimary"
						component="span"
					>
						{userName}
					</Typography>
					<Typography
						className={classes.subText}
						variant="body1"
						color="textPrimary"
						component="span"
						style={{paddingLeft: 2, paddingRight: 2}}
					>
						•
					</Typography>
					<Typography
						className={classes.subText}
						variant="body1"
						color="textPrimary"
						component="span"
					>
						{`${Math.ceil(contentText.length / 200) || 1} min read`}
					</Typography>
				</Box>
			</Box>
		</Box>
	);
}
