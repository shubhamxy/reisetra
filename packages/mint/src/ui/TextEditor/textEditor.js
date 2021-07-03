import React, {useCallback, useEffect, useRef} from "react";
import {SlateEditor} from "./editor";
import {useStyles} from "./styles";

export default React.forwardRef(function TextEditor(
	{placeholder, readOnly, value, onChange, onError, ...other},
	ref,
) {
	const s = useStyles();
	const editorRef = useRef(null);
	return (
		<SlateEditor
			ref={ref || editorRef}
			classes={{
				root: s.root,
				content: s.content,
			}}
			readOnly={readOnly}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			autoFocus
			spellCheck
			{...other}
		/>
	);
});
