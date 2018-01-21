import React, { Component } from "react";
import { Helmet } from "react-helmet";
import List from "./List";

class Board extends Component {
  constructor() {
    super();
    this.state = {
      lists: [
        {
          title: "TODO Big picture",
          cards: [
            {
              title: "Inspect how trello deals with loading boards, images"
            },
            { title: "Make skeleton structure of whatever" }
          ]
        }
      ]
    };
  }
  render = () => (
    <div className="board">
      <Helmet>
        <title>Board name | Trello</title>
      </Helmet>
      {this.state.lists.map(list => <List list={list} />)}
    </div>
  );
}

export default Board;
