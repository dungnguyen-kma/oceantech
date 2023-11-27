import React from "react";
import { IconButton, Icon } from "@material-ui/core";

function TableActionIcon(props) {
  const { color, title, onClick } = props;
  return (
    <IconButton size="small" onClick={onClick}>
      <Icon fontSize="small" color={color}>
        {title}
      </Icon>
    </IconButton>
  );
}

export default TableActionIcon