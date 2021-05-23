import React, {useCallback, useEffect} from "react";
import {Node, Transforms} from "slate";
import {Editable, Slate} from "slate-react";

import {Toolbar} from "./toolbar";
import {Box} from "@material-ui/core";
import {useEditor} from "./useEditor";
import {FormControl, FormHelperText} from "@material-ui/core";

import {HOTKEYS, isHotkey} from "./utils";
import {toggleMark} from "./plugins";

export const SlateEditor = React.forwardRef(function Editor(
	{
		bottom,
		wrapper,
		required,
		fullWidth,
		field,
		value,
		meta,
		onChange,
		classes,
		children,
		placeholder,
		readOnly,
		...other
	},
	ref,
) {
	const {
		editor,
		handleSelection,
		RenderElements,
		LeafElements,
		toolbarAnchor,
		setToolbarAnchor,
	} = useEditor();

	useEffect(() => {
		ref.current = editor;
	}, [editor, ref]);

	useEffect(() => {
		if (!value) {
			Transforms.deselect(editor);
			// or set selection to neutral state:
			// editor.selection = {
			// 	anchor: {path: [0, 0], offset: 0},
			// 	focus: {path: [0, 0], offset: 0},
			// };
		}
	}, [editor, value]);

	return (
		<Slate editor={editor} value={value} onChange={onChange}>
			<Box className={`${classes.root}`}>
				<Editable
					readOnly={readOnly}
					className={`${classes.content} scrollbar-active`}
					placeholder={placeholder}
					renderElement={RenderElements}
					renderLeaf={LeafElements}
					onSelect={handleSelection}
					onBlur={() => setToolbarAnchor(null)}
					onKeyDown={event => {
						for (const hotkey in HOTKEYS) {
							if (isHotkey(hotkey, event)) {
								event.preventDefault();
								const mark = HOTKEYS[hotkey];
								toggleMark(editor, mark);
							}
						}
					}}
				/>
				<Toolbar open={!!toolbarAnchor} anchorEl={toolbarAnchor} />
			</Box>
		</Slate>
	);
});

export {Node};
