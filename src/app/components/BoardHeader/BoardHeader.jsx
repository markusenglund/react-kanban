import React from "react";
import BoardTitle from "./BoardTitle";
import ColorPicker from "./ColorPicker";
import BoardDeleter from "./BoardDeleter";
import BoardUserAdd from "./BoardUserAdder";
import BoardMenu from "./BoardMenu";
import "./BoardHeader.scss";

const BoardHeader = () => (
  <div className="board-header">
    <BoardTitle />
    <div className="board-header-right">
      <BoardUserAdd />
      <div className="vertical-line" />
      <ColorPicker />
      <div className="vertical-line" />
      <BoardDeleter />
      {/* <BoardMenu /> */}
    </div>
  </div>
);

export default BoardHeader;
