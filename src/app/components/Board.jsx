import React, { Component } from "react";
import { Helmet } from "react-helmet";

class Board extends Component {
  render = () => (
    <div className="board">
      <Helmet>
        <title>Board name | Trello</title>
      </Helmet>
      <h1>Hello its me your board</h1>
    </div>
  );
}

export default Board;
