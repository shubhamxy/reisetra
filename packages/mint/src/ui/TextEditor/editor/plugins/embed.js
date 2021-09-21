import * as React from "react";

import {Button} from "@material-ui/core";
import {Transforms} from "slate";
import {useSlate} from "slate-react";
import {Link} from "@material-ui/icons";

export const ALLOWED_HOSTS = new Set([
	"www.youtube.com",
	"www.vimeo.com",
	"www.twitter.com",
	"player.vimeo.com",
	"open.spotify.com",
]);

export function sanitize(html) {

}

//@TODO fix this
export function isEmbedURL(str) {
	// const iframeRegex = /<iframe(.+)<\/iframe>/g;
	// return iframeRegex.test(str);
	return true;
}

export function embedCode(str) {
	try {
		let string = String(str);
		if (!string) {
			return "";
		}
		string = string
			.replace(/&nbsp;/g, " ")
			.replace(/<p><br><\/p>/g, " ")
			.trim();
		string = sanitize(string);
		return string;
	} catch (err) {
		return "";
	}
}

export const insertEmbeds = (editor, data) => {
	const text = {text: ""};
	const validate = data.map(item => {
		const mediaUrl = item.mediaUrl;
		if (mediaUrl) {
			if (isEmbedURL(mediaUrl)) {
				const mediaCode = embedCode(item.mediaUrl);
				if (mediaCode) {
					return {
						mediaUrl: mediaCode,
						title: item.title,
					};
				}
			}
		}
		return null;
	});
	const validData = validate.filter(Boolean);
	const embeded = {type: "embed", data: validData, children: [text]};
	if (validData.length > 0) {
		Transforms.insertNodes(editor, embeded);
		return true;
	}
	return false;
};

export const InsertEmbedsButton = () => {
	const editor = useSlate();
	return (
		<Button
			variant="contained"
			onMouseDown={event => {
				event.preventDefault();
				const url = isBrowser && window.prompt("Enter the URL:");
				insertEmbeds(editor, url);
			}}
		>
			<Link />
		</Button>
	);
};

export const withEmbeds = editor => {
	const {isVoid} = editor;
	editor.isVoid = element =>
		element.type === "embed" ? true : isVoid(element);
	return editor;
};
