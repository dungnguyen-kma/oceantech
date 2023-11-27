function trimValueObj(obj) {
	const newObj = {};
	for (const [key, value] of Object.entries(obj)) {
		newObj[key] = typeof value === "string" ? value.trim() : value;
	}

	return newObj;
}

export default trimValueObj;