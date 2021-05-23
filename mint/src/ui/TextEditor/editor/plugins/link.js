import {Transforms, Editor, Range} from "slate";

export const isLinkActive = (editor, selection = undefined) => {
	const [link] = Array.from(
		Editor.nodes(editor, {
			match: n => n.type === "link",
			at: selection,
		}),
	);

	return !!link;
};

export const unwrapLink = (editor, selection = undefined) => {
	Transforms.unwrapNodes(editor, {
		match: n => n.type === "link",
		at: selection,
	});
};

const wrapLink = (editor, url, selection) => {
	if (isLinkActive(editor, selection)) {
		unwrapLink(editor, selection);
	}

	const isCollapsed = selection && Range.isCollapsed(selection);
	const link = {
		type: "link",
		url,
		children: isCollapsed ? [{text: url}] : [],
	};

	if (isCollapsed) {
		Transforms.insertNodes(editor, link, {at: selection});
	} else {
		Transforms.wrapNodes(editor, link, {split: true, at: selection});
		Transforms.collapse(editor, {edge: "end"});
	}
};

export const withLinks = editor => {
	const {isInline} = editor;

	editor.isInline = element => {
		return element.type === "link" ? true : isInline(element);
	};

	return editor;
};

export const insertLink = (editor, url, selection) => {
	if (selection) {
		wrapLink(editor, url, selection);
	}
};
