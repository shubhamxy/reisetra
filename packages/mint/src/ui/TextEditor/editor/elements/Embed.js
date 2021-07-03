import React from "react";
import {
	ReactEditor,
	useFocused,
	useReadOnly,
	useSelected,
	useSlate,
} from "slate-react";
import {Transforms} from "slate";
import {insertEmbeds, isEmbedURL} from "../plugins/embed";

import {EmbedsPreview} from "../../../MediaPreview";

export default function ({attributes, children, element}) {
	const selected = useSelected();
	const focused = useFocused();
	const editor = useSlate();
	const readOnly = useReadOnly();
	const {data} = element;
	return (
		<div {...attributes}>
			<EmbedsPreview
				showRemoveIcon={!readOnly}
				style={{userSelect: "none"}}
				readOnly={readOnly}
				selected={selected}
				focused={focused}
				contentEditable={false}
				data={data}
				handleRemoveItem={() => {
					const path = ReactEditor.findPath(editor, element);
					Transforms.removeNodes(editor, {at: path});
				}}
				onChange={data => {
					const path = ReactEditor.findPath(editor, element);
					if (!insertEmbeds(editor, data)) {
						Transforms.removeNodes(editor, {at: path});
					}
				}}
			/>
			{children}
		</div>
	);
}
