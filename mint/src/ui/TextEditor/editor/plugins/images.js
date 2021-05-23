import * as React from "react";
import {Image} from "@material-ui/icons";
import {Box, Button, Icon} from "@material-ui/core";
import {Transforms} from "slate";
import {useSlate} from "slate-react";

function isURL(url) {
	if (!url) {
		return false;
	}
	return String(url).match(/\.(jpeg|jpg|gif|png)$/i) != null;
}

export const insertImage = (editor, data) => {
	const text = {text: ""};
	const validData = data.filter(media =>
		Boolean(media?.mediaUrl && isURL(media.mediaUrl)),
	);
	const image = [
		{type: "image", data: validData, children: [text]},
		{
			type: "paragraph",
			children: [{text: "", marks: []}],
		},
	];
	if (validData.length > 0) {
		Transforms.insertNodes(editor, image);
	}
};

export const InsertImageButton = () => {
	const editor = useSlate();
	return (
		<Button
			variant="contained"
			onMouseDown={event => {
				event.preventDefault();
				const url = window.prompt("Enter the URL of the image:");
				insertImage(editor, url);
			}}
		>
			<Image />
		</Button>
	);
};

export const withImages = editor => {
	const {insertData, isVoid} = editor;

	editor.isVoid = element => {
		return element.type === "image" ? true : isVoid(element);
	};

	// editor.insertData = (data) => {
	//   const text = data.getData("text/plain");
	//   const { files } = data;

	//   if (files && files.length > 0) {
	//     for (const file of files) {
	//       const reader = new FileReader();
	//       const [mime] = file.type.split("/");

	//       if (mime === "image") {
	//         reader.addEventListener("load", () => {
	//           const url = reader.result;
	//           insertImage(editor, url);
	//         });

	//         reader.readAsDataURL(file);
	//       }
	//     }
	//   } else {
	//     insertImage(editor, text);
	//   }
	// };

	return editor;
};
