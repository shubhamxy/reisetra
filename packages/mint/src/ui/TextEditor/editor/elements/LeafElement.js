import React from "react";

export const LeafElement = ({attributes, children, leaf}) => {
	if (leaf.bold) {
		children = <strong>{children}</strong>;
	}
	if (leaf.italic) {
		children = <em>{children}</em>;
	}

	if (leaf.underline) {
		children = <u>{children}</u>;
	}

	return <span {...attributes}>{children}</span>;
};
