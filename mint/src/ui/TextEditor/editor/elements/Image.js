import React from "react";
import {Transforms} from "slate";
import {
	ReactEditor,
	useFocused,
	useReadOnly,
	useSelected,
	useSlate,
} from "slate-react";
import {ImagePreview} from "../../../MediaPreview";
import {insertImage} from "../plugins/images";

export default function ({attributes, children, element}) {
	const selected = useSelected();
	const focused = useFocused();
	const editor = useSlate();
	const readOnly = useReadOnly();

	return (
		<div {...attributes}>
			<ImagePreview
				showRemoveIcon={!readOnly}
				objectFit="cover"
				readOnly={readOnly}
				style={{userSelect: "none"}}
				contentEditable={false}
				selected={selected}
				focused={focused}
				data={element.data}
				handleRemoveItem={(e, index, item) => {
					const path = ReactEditor.findPath(editor, element);
					const data = [...element.data];
					data.splice(index, 1);
					if (!insertImage(editor, data)) {
						Transforms.removeNodes(editor, {at: path});
					}
				}}
			/>
			{children}
		</div>
	);
}
