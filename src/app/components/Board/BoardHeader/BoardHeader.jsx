import React from "react";
import BoardTitle from "./BoardTitle";
import ColorPicker from "./ColorPicker";
import "./BoardHeader.scss";

const BoardHeader = () => (
  <div className="board-header-wrapper">
    <div className="board-header">
      <BoardTitle />
      <div className="vertical-line" />
      <ColorPicker />
      <div className="vertical-line" />
    </div>
  </div>
);

export default BoardHeader;
