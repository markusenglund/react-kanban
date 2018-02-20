import React from "react";
import BoardTitle from "./BoardTitle";
import ColorPicker from "./ColorPicker";

const BoardHeader = () => (
  <div className="board-header">
    <BoardTitle />
    <div className="vertical-line" />
    <ColorPicker />
    <div className="vertical-line" />
  </div>
);

export default BoardHeader;
