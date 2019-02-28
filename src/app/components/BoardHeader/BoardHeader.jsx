import React from "react";
import BoardTitle from "./BoardTitle";
import ColorPicker from "./ColorPicker";
import BoardDeleter from "./BoardDeleter";
import BoardLeave from "./BoardLeave";

import {Popover,Pane,Text,Button} from 'evergreen-ui';
import "./BoardHeader.scss";

const BoardHeader = () => (
  <div className="board-header">
    <BoardTitle />
    <div className="board-header-right">
      <div className="vertical-line" />
      <ColorPicker />
      <div className="vertical-line" />
      <BoardDeleter />
      <div className="vertical-line" />
      <BoardLeave />
    </div>
  </div>
);

export default BoardHeader;
