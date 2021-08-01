import * as React from "react";

import {Box, Button, Icon} from "@material-ui/core";
import {Transforms} from "slate";
import {useSlate} from "slate-react";
import {Movie} from "@material-ui/icons";

function isURL(url) {
	if (!url) {
		return false;
	}
	return String(url).match(/\.(mp4)$/i) != null;
}

export const insertVideo = (editor, data) => {
	const validData = data.filter(media =>
		Boolean(media?.url && isURL(media.url)),
	);
	const video = [
		{type: "video", data: validData, children: [{text: ""}]},
		{
			type: "paragraph",
			children: [{text: "", marks: []}],
		},
	];
	if (validData.length > 0) {
		Transforms.insertNodes(editor, video);
	}
};

export const InsertVideoButton = () => {
	const editor = useSlate();
	return (
		<Button
			variant="contained"
			onMouseDown={event => {
				event.preventDefault();
				const url = window.prompt("Enter the URL of the video:");
				insertVideo(editor, url);
			}}
		>
			<Movie />
		</Button>
	);
};

export const withVideo = editor => {
	const {insertData, isVoid} = editor;

	editor.isVoid = element => {
		return element.type === "video" ? true : isVoid(element);
	};

	// editor.insertData = (data) => {
	//   const text = data.getData("text/plain");
	//   const { files } = data;

	//   if (files && files.length > 0) {
	//     for (const file of files) {
	//       const reader = new FileReader();
	//       const [mime] = file.type.split("/");
	//       console.log({mime});
	//       if (mime === "video") {
	//         reader.addEventListener("load", () => {
	//           const url = reader.result;
	//           insertVideo(editor, url);
	//         });

	//         reader.readAsDataURL(file);
	//       }
	//     }
	//   } else {
	//     insertVideo(editor, text);
	//   }
	// };

	return editor;
};
