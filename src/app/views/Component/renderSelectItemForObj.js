import React from "react";
import { MenuItem } from "@material-ui/core";

export const renderSelectItemForObj = (obj) => {
	let arrComponent = [];
	for (let key in obj) {
		let item = (
			<MenuItem
				key={key}
				value={key}
			>
				{obj[key]}
			</MenuItem>
		);
		arrComponent.push(item);
	}
	return arrComponent;
};
