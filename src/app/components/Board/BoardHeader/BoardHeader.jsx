import React from "react";
import BoardTitle from "./BoardTitle";
import ColorPicker from "./ColorPicker";
import BoardDeleter from "./BoardDeleter";
import "./BoardHeader.scss";

const BoardHeader = () => (
  <div className="board-header">
    <BoardTitle />
    <div className="vertical-line" />
    <ColorPicker />
    <div className="vertical-line" />
    <BoardDeleter />
  </div>
);

export default BoardHeader;
