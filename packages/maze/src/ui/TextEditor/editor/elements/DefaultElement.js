/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable default-case */
import React from "react";
import {Typography} from "@material-ui/core";
import Embed from "./Embed";
import Video from "./Video";
import Image from "./Image";

export const DefaultElement = React.forwardRef(function DefaultElement(
	{attributes, element, children, ...others},
	ref,
) {
	switch (element.type) {
		case "block-quote":
			return <blockquote {...attributes}>{children}</blockquote>;
		case "heading-one":
			return <h1 {...attributes}>{children}</h1>;
		case "heading-two":
			return <h2 {...attributes}>{children}</h2>;
		case "heading-three":
			return <h3 {...attributes}>{children}</h3>;

		case "list-item":
			return <li {...attributes}>{children}</li>;
		case "bulleted-list":
			return <ul {...attributes}>{children}</ul>;
		case "numbered-list":
			return <ol {...attributes}>{children}</ol>;
		case "link":
			return (
				<a {...attributes} href={element.url} target="_blank" rel="noreferrer">
					{children}
				</a>
			);

		case "image":
			return (
				<Image attributes={attributes} element={element} children={children} />
			);
		case "video":
			return (
				<Video attributes={attributes} element={element} children={children} />
			);
		case "embed":
			return (
				<Embed attributes={attributes} element={element} children={children} />
			);
	}
	return (
		<Typography {...attributes} component="p" ref={ref} variant="caption">
			{children}
		</Typography>
	);
});
