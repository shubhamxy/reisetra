import React from "react";
import {Transforms} from "slate";
import {
	ReactEditor,
	useFocused,
	useReadOnly,
	useSelected,
	useSlate,
} from "slate-react";
import {VideoPreview} from "../../../MediaPreview";

export default function Video({attributes, children, element}) {
	const selected = useSelected();
	const focused = useFocused();
	const editor = useSlate();
	const readOnly = useReadOnly();
	console.log({readOnly});
	return (
		<div {...attributes}>
			<VideoPreview
				showRemoveIcon={!readOnly}
				readOnly={readOnly}
				selected={selected}
				focused={focused}
				style={{userSelect: "none"}}
				contentEditable={false}
				data={element.data}
				handleRemoveItem={(e, index, item) => {
					const path = ReactEditor.findPath(editor, element);
					Transforms.removeNodes(editor, {at: path});
				}}
			/>
			{children}
		</div>
	);
}
