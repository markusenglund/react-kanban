// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import List from "./List";
// import DndExample from "./BeautifulDndExample";
import "./Board.scss";

type Props = {
  lists: Array<{ id: string }>,
  boardTitle: string
};

class Board extends Component<Props> {
  render = () => {
    const { lists, boardTitle } = this.props;
    return (
      <div className="board">
        <Helmet>
          <title>{boardTitle} | Trello</title>
        </Helmet>
        <div className="board-header">
          <h1 className="board-title">{boardTitle}</h1>
        </div>
        <div className="lists">
          {lists.map(list => <List key={list.id} list={list} />)}
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state, ownProps) => {
  const { boardId } = ownProps.match.params;
  const board = state.boards[boardId];
  return {
    lists: board.lists.map(listId => state.lists[listId]),
    boardTitle: board.title
  };
};

export default connect(mapStateToProps)(Board);
