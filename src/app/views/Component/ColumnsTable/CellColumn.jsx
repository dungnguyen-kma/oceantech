import React from "react";
import { Tooltip } from "@material-ui/core";

function CellColumn(props) {
	const { data } = props;
	return (
		<Tooltip title={data || ""}>
			<span className="line-clamp-1 break-word">{data}</span>
		</Tooltip>
	);
}

export default CellColumn;
