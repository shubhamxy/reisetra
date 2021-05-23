import _isEqual from "lodash.isequal";
import {Node} from "slate";

const serialize = nodes => {
	return nodes.map(n => Node.string(n)).join("\n");
};

const deserialize = string => {
	return string.split("\n").map(line => {
		return {
			children: [{text: line ? line : ""}],
		};
	});
};

/**
 *
 * @param {Array} nodes - slate nodes in JSON format
 * @param {'image' | 'video' | 'embed'} type - node type
 * @returns slate nodes in JSON format
 */

export function getTotalCount(nodes, type = "image") {
	let count = 0;
	nodes.forEach(node => {
		if (node.type === type) {
			count += node.data.length;
		}
	});
	return count;
}
/**
 *
 * @param {Array} nodes - slate nodes in JSON format
 * @param {'image' | 'video' | 'embed'} type - node type
 * @returns {Array} data
 */

export function getAllNodesData(nodes, type = "image") {
	let data = [];
	nodes.forEach(node => {
		if (
			node.type === type &&
			node.data &&
			Array.isArray(node.data) &&
			node.data.length > 0
		) {
			data = data.concat(node.data);
		}
	});
	return data;
}

/**
 *
 * @param {Array} nodes - slate nodes in JSON format
 * @returns {Boolean} isEmpty
 */
export function isEmpty(nodes) {
	return (
		!nodes ||
		_isEqual(nodes, [
			{
				type: "paragraph",
				children: [{text: "", marks: []}],
			},
		])
	);
}

/**
 *
 * @param {string} string - JSON.stringify serialized string
 * @returns slate nodes in JSON format
 */
export function fromString(string) {
	try {
		const result = JSON.parse(string);
		if (Array.isArray(result)) {
			return result;
		}
		return [
			{
				type: "paragraph",
				children: [{text: "", marks: []}],
			},
		];
	} catch (err) {
		// console.log("Error@fromString" + err);
		return [
			{
				type: "paragraph",
				children: [{text: "", marks: []}],
			},
		];
	}
}

/**
 * @param {Array} obj -  slate nodes in JSON format
 * @returns {string} JSON.stringify string to store in db or localstorage
 */

export function toString(obj) {
	try {
		return JSON.stringify(obj);
	} catch (err) {
		return "";
	}
}

/**
 * @param {string} string -   human readable string delimited by \n
 * @returns {Object} slate nodes in JSON format
 */

export function fromText(string) {
	return deserialize(string);
}

/**
 * @param {Object} obj - slate nodes in JSON format
 * @returns {string}  human readable string delimited by \n
 */

export function toText(nodes) {
	if (!nodes || !Array.isArray(nodes)) {
		return "";
	}
	return serialize(nodes);
}
